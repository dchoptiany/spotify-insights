package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

func GetSpotifyPlaylist(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlist *spotify.FullPlaylist = nil

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			playlist, err = spotifyClient.GetPlaylist(spotify.ID(playlistID))

			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			} else {
				c.JSON(http.StatusOK, playlist)
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}

func GetSpotifyPlaylistsArtists(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlist *spotify.FullPlaylist = nil
	var artists []string

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			playlist, err = spotifyClient.GetPlaylist(spotify.ID(playlistID))

			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			} else {
				// loop through playlist's artists
				artists = make([]string, 0)

				for i := 0; i < playlist.Tracks.Total; i++ {
					for j := 0; j < len(playlist.Tracks.Tracks[i].Track.Artists); j++ {
						artists = append(artists, playlist.Tracks.Tracks[i].Track.Artists[j].Name)
					}
				}

				c.JSON(http.StatusOK, artists) // TO DO: Utworzyć osobny model na feature'y playlisty (?)
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}

func GetPlaylistPopularity(c *gin.Context) {

}
