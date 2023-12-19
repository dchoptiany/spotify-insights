package controllers

import (
	"net/http"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

const TopGlobalPlaylistID = "37i9dQZEVXbMDoHDwVN2tF?si=57659a09337c4067"
const TopPolandPlaylistID = "37i9dQZEVXbN6itCcaL3Tt?si=52c6f869697741ca"

func GetTopTracksGlobal(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlist *spotify.FullPlaylist = nil
	var dataSketchesPlaylist models.DataSketchesPlaylist = models.DataSketchesPlaylist{Tracks: make([]models.DataSketchesTrack, 0)}
	var spotifyArtist *spotify.FullArtist

	// payload -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// get Top Global playlist
		playlist, err = spotifyClient.GetPlaylist(TopGlobalPlaylistID)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			numOfTotalSpotifyTracks := playlist.Tracks.Total

			// array of playlist's tracks
			spotifyTrackArr := playlist.Tracks.Tracks

			for i := 0; i < numOfTotalSpotifyTracks; i++ {
				// data sketch track
				track := models.DataSketchesTrack{Artists: make([]models.SpotifyArtist, 0)}

				// playlist's track
				spotifyTrack := spotifyTrackArr[i]
				// tracks's artists
				spotifyArtistsArr := spotifyTrack.Track.Artists

				for a := 0; a < len(spotifyArtistsArr); a++ {
					// data sketch artist
					artist := models.SpotifyArtist{}

					// track's artist's info
					spotifySimpleArtist := spotifyArtistsArr[a]

					// fill the data sketch artist's info
					artist.ID = string(spotifySimpleArtist.ID)
					artist.Name = spotifySimpleArtist.Name

					// add artist to track's slice of artists
					track.Artists = append(track.Artists, artist)
				}

				// get artist's full info
				spotifyArtist, err = spotifyClient.GetArtist(spotify.ID(track.Artists[0].ID))
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}

				// genre
				if len(spotifyArtist.Genres) > 0 {
					track.Genre = spotifyArtist.Genres[0]
				}

				// add track to the dataSketchesPlaylist
				dataSketchesPlaylist.Tracks = append(dataSketchesPlaylist.Tracks, track)
			}

			// send playlistForAnalysis as JSON
			c.JSON(http.StatusOK, dataSketchesPlaylist)
		}
	}
}

func GetTopTracksPoland(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlist *spotify.FullPlaylist = nil
	var dataSketchesPlaylist models.DataSketchesPlaylist = models.DataSketchesPlaylist{Tracks: make([]models.DataSketchesTrack, 0)}
	var spotifyArtist *spotify.FullArtist

	// payload -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		playlist, err = spotifyClient.GetPlaylist(TopPolandPlaylistID)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			numOfTotalSpotifyTracks := playlist.Tracks.Total

			// array of playlist's tracks
			spotifyTrackArr := playlist.Tracks.Tracks

			for i := 0; i < numOfTotalSpotifyTracks; i++ {
				// data sketch track
				track := models.DataSketchesTrack{Artists: make([]models.SpotifyArtist, 0)}

				// playlist's track
				spotifyTrack := spotifyTrackArr[i]
				// track's artists
				spotifyArtistsArr := spotifyTrack.Track.Artists
				for a := 0; a < len(spotifyArtistsArr); a++ {
					// data sketch artist
					artist := models.SpotifyArtist{}

					// track's artist's info
					spotifySimpleArtist := spotifyArtistsArr[a]

					// fill the data sketch artist's info
					artist.ID = string(spotifySimpleArtist.ID)
					artist.Name = spotifySimpleArtist.Name

					// add artist to track's slice of artists
					track.Artists = append(track.Artists, artist)
				}

				// get artist's full info
				spotifyArtist, err = spotifyClient.GetArtist(spotify.ID(track.Artists[0].ID))

				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}

				// genre
				if len(spotifyArtist.Genres) > 0 {
					track.Genre = spotifyArtist.Genres[0]
				}

				// add track to the dataSketchesPlaylist
				dataSketchesPlaylist.Tracks = append(dataSketchesPlaylist.Tracks, track)
			}

			// send playlistForAnalysis as JSON
			c.JSON(http.StatusOK, dataSketchesPlaylist)
		}
	}
}
