package controllers

import (
	"net/http"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

func GetUsersSavedTracksForAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token

	var playlistForAnalysis models.SpotifyPlaylist = models.SpotifyPlaylist{Tracks: make([]models.SpotifyTrack, 0)}

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		savedTrackPage, err := spotifyClient.CurrentUsersTracks()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		} else {
			// create playlistForAnalysis
			for _, st := range savedTrackPage.Tracks {
				// create trackForAnalysis
				track := models.SpotifyTrack{Artists: make([]models.SpotifyArtist, 0)}

				// id
				track.ID = string(st.ID)

				// title
				track.Title = st.Name

				// artists
				for a := 0; a < len(st.Artists); a++ {
					artist := models.SpotifyArtist{ID: string(st.Artists[a].ID), Name: st.Artists[a].Name}
					track.Artists = append(track.Artists, artist)
				}

				// get track's artist's full info
				spotifyArtist, err := spotifyClient.GetArtist(spotify.ID(track.Artists[0].ID))
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}

				// genre
				if len(spotifyArtist.Genres) > 0 {
					track.Genre = spotifyArtist.Genres[0]
				}

				// release date
				track.Release_date = st.Album.ReleaseDate

				// duration
				track.Duration = st.Duration

				// popularity
				track.Popularity = st.Popularity

				// get track's audio features
				spotifyAudioFeaturesArr, err := spotifyClient.GetAudioFeatures(spotify.ID(track.ID))
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}
				spotifyAudioFeatures := spotifyAudioFeaturesArr[0]

				// energy
				track.Energy = spotifyAudioFeatures.Energy

				// danceability
				track.Danceability = spotifyAudioFeatures.Danceability

				// add tracks to playlistForAnalysis
				playlistForAnalysis.Tracks = append(playlistForAnalysis.Tracks, track)
			}

			// send playlistForAnalysis as JSON
			c.JSON(http.StatusOK, playlistForAnalysis)
		}
	}
}
