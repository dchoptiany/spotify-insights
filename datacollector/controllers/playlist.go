package controllers

import (
	"context"
	"net/http"
	"spotify_insights/datacollector/config"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify/v2"
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
			playlist, err = spotifyClient.GetPlaylist(context.Background(), spotify.ID(playlistID))

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
			playlist, err = spotifyClient.GetPlaylist(context.Background(), spotify.ID(playlistID))

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

func GetPlaylistForAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token

	var spotifyPlaylist *spotify.FullPlaylist = nil
	var spotifyAudioFeaturesArr []*spotify.AudioFeatures = nil
	var spotifyAudioFeatures *spotify.AudioFeatures = nil

	var playlistForAnalysis models.SpotifyPlaylist = models.SpotifyPlaylist{Tracks: make([]models.SpotifyTrack, 0)}

	// payload -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			spotifyPlaylist, err = spotifyClient.GetPlaylist(context.Background(), spotify.ID(playlistID))

			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			} else {
				var artistIDs []spotify.ID = make([]spotify.ID, 0)
				totalNumOfSpotifyTracks := spotifyPlaylist.Tracks.Total

				// playlist's tracks
				spotifyTrackArr := spotifyPlaylist.Tracks.Tracks

				// fill the playlistForAnalysis
				for i := 0; i < totalNumOfSpotifyTracks; i++ {
					// track model
					track := models.SpotifyTrack{Artists: make([]models.SpotifyArtist, 0)}

					// playlist's track
					spotifyTrack := spotifyTrackArr[i].Track

					// id
					track.ID = string(spotifyTrack.ID)

					// title
					track.Title = spotifyTrack.Name

					// artists
					for a := 0; a < len(spotifyTrack.Artists); a++ {
						artist := models.SpotifyArtist{ID: string(spotifyTrack.Artists[a].ID), Name: spotifyTrack.Artists[a].Name}
						track.Artists = append(track.Artists, artist)
					}

					// add artist's ID to slice
					artistIDs = append(artistIDs, spotifyTrack.Artists[0].ID)

					// release date
					track.Release_date = spotifyTrack.Album.ReleaseDate

					// duration
					track.Duration = spotifyTrack.Duration

					// popularity
					track.Popularity = spotifyTrack.Popularity

					// get track's audio features
					spotifyAudioFeaturesArr, err = spotifyClient.GetAudioFeatures(context.Background(), spotify.ID(track.ID))
					if err != nil {
						c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					}
					spotifyAudioFeatures = spotifyAudioFeaturesArr[0]

					// energy
					track.Energy = spotifyAudioFeatures.Energy

					// danceability
					track.Danceability = spotifyAudioFeatures.Danceability

					// add tracks to playlistForAnalysis
					playlistForAnalysis.Tracks = append(playlistForAnalysis.Tracks, track)
				}

				var offset int = 0
				for len(artistIDs) > 0 {
					tmpArtistIDs := make([]spotify.ID, 0)
					if len(artistIDs) > config.MaximalArtistsCapacity {
						tmpArtistIDs = append(tmpArtistIDs, artistIDs[:50]...)
						artistIDs = artistIDs[50:]
					} else {
						tmpArtistIDs = append(tmpArtistIDs, artistIDs...)
						artistIDs = artistIDs[:0]
					}

					var spotifyArtists []*spotify.FullArtist
					spotifyArtists, err = spotifyClient.GetArtists(context.Background(), tmpArtistIDs...)
					if err != nil {
						c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
					}

					for i := 0; i < len(spotifyArtists); i++ {
						idx := config.MaximalArtistsCapacity*offset + i
						// get track's artist's full info
						spotifyArtist := spotifyArtists[i]

						// genre
						track := &playlistForAnalysis.Tracks[idx]
						if spotifyArtist.Genres != nil && len(spotifyArtist.Genres) > 0 {
							track.Genre = spotifyArtist.Genres[0]
						}
					}

					offset += 1
				}

				// send playlistForAnalysis as JSON
				c.JSON(http.StatusOK, playlistForAnalysis)
			}
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}

func GetPlaylistInfo(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlist *spotify.FullPlaylist = nil
	var playlistInfo models.PlaylistInfo = models.PlaylistInfo{}

	// payload -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			playlist, err = spotifyClient.GetPlaylist(context.Background(), spotify.ID(playlistID))

			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			playlistInfo.Name = playlist.Name
			playlistInfo.OwnerName = playlist.Owner.DisplayName
			playlistInfo.Desc = playlist.Description
			playlistInfo.Image = playlist.Images[0].URL
			playlistInfo.NumOfFollowers = int(playlist.Followers.Count)

			// send playlistInfo as JSON
			c.JSON(http.StatusOK, playlistInfo)

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}
