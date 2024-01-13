package controllers

import (
	"bufio"
	"context"
	"net/http"
	"os"
	"spotify_insights/datacollector/config"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify/v2"
)

const PlaylistsFilename = config.TopPlaylistsIDFile

var maximalCapacity int = 50

func GetTrendTracks(c *gin.Context) {
	var err error
	var client models.Client
	var spotifyPlaylist *spotify.FullPlaylist = nil
	var spotifyArtists []*spotify.FullArtist
	var dataPlaylist models.DataSketchesPlaylist = models.DataSketchesPlaylist{make([]models.DataSketchesTrack, 0)}
	var listOfDataPlaylist models.DataSketchesPlaylistList = models.DataSketchesPlaylistList{make([]models.DataSketchesPlaylist, 0)}

	// create client
	client = models.CreateClient()
	spotifyClient := client.SpotifyClient

	// open playlistsFile
	file, err := os.Open(PlaylistsFilename)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		playlistID := scanner.Text()
		spotifyPlaylist, err = spotifyClient.GetPlaylist(context.Background(), spotify.ID(playlistID))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var artistsIDs []spotify.ID = make([]spotify.ID, 0)

		totalNumOfSpotifyTracks := spotifyPlaylist.Tracks.Total
		if totalNumOfSpotifyTracks > maximalCapacity {
			totalNumOfSpotifyTracks = maximalCapacity
		}

		// playlist's tracks
		spotifyTrackArr := spotifyPlaylist.Tracks.Tracks

		for i := 0; i < totalNumOfSpotifyTracks; i++ {
			dataTrack := models.DataSketchesTrack{}

			// playlist's track
			spotifyTrack := spotifyTrackArr[i].Track

			// id
			dataTrack.ID = string(spotifyTrack.ID)

			// add artist's ID to slice
			artistsIDs = append(artistsIDs, spotifyTrack.Artists[0].ID)

			// release date
			dataTrack.Release_date = spotifyTrack.Album.ReleaseDate

			// add tracks to playlistForAnalysis
			dataPlaylist.Tracks = append(dataPlaylist.Tracks, dataTrack)
		}

		spotifyArtists, err = spotifyClient.GetArtists(context.Background(), artistsIDs...)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		for idx := 0; idx < totalNumOfSpotifyTracks; idx++ {
			track := dataPlaylist.Tracks[idx]
			if len(spotifyArtists[idx].Genres) > 0 {
				track.Genre = spotifyArtists[idx].Genres[0]
			}
		}

		listOfDataPlaylist.Playlists = append(listOfDataPlaylist.Playlists, dataPlaylist)
	}

	// send dataPlaylist as JSON
	c.JSON(http.StatusOK, listOfDataPlaylist)
}
