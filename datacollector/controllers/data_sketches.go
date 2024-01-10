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

func GetTrendTracks(c *gin.Context) {
	var err error
	var client models.Client
	var spotifyPlaylist *spotify.FullPlaylist = nil
	var spotifyArtist *spotify.FullArtist = nil
	var dataPlaylist models.DataSketchesPlaylist = models.DataSketchesPlaylist{make([]models.DataSketchesTrack, 0)}
	var listOfDataPlaylist models.DataSketchesPlaylistList = models.DataSketchesPlaylistList{make([]models.DataSketchesPlaylist, 0)}

	// create client
	// TODO: Change for token read from JSON #?
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

		totalNumOfSpotifyTracks := spotifyPlaylist.Tracks.Total

		// playlist's tracks
		spotifyTrackArr := spotifyPlaylist.Tracks.Tracks

		for i := 0; i < totalNumOfSpotifyTracks; i++ {
			dataTrack := models.DataSketchesTrack{}

			// playlist's track
			spotifyTrack := spotifyTrackArr[i].Track

			// id
			dataTrack.ID = string(spotifyTrack.ID)

			// get track's artist's full info
			spotifyArtist, err = spotifyClient.GetArtist(context.Background(), spotifyTrack.Artists[0].ID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			// genre
			if spotifyArtist.Genres != nil && len(spotifyArtist.Genres) > 0 {
				dataTrack.Genre = spotifyArtist.Genres[0]
			}

			// release date
			dataTrack.Release_date = spotifyTrack.Album.ReleaseDate

			// add tracks to playlistForAnalysis
			dataPlaylist.Tracks = append(dataPlaylist.Tracks, dataTrack)
		}

		listOfDataPlaylist.Playlists = append(listOfDataPlaylist.Playlists, dataPlaylist)
	}

	// send dataPlaylist as JSON
	c.JSON(http.StatusOK, listOfDataPlaylist)
}
