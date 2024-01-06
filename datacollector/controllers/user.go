package controllers

import (
	"net/http"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

func GetUserInfo(c *gin.Context) {
	var err error
	var token oauth2.Token
	var userInfo models.UserInfo = models.UserInfo{}

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// get current user
		spotifyUser, err := spotifyClient.CurrentUser()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		userInfo.Name = spotifyUser.DisplayName
		userInfo.NumOfFollowers = int(spotifyUser.Followers.Count)

		followedSpotifyArtists, err := spotifyClient.CurrentUsersFollowedArtists()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		userInfo.NumOfFollowingArtists = followedSpotifyArtists.Total // #?
		userInfo.Image = spotifyUser.Images[0].URL

		// send playlistForAnalysis as JSON
		c.JSON(http.StatusOK, userInfo)
	}
}

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
				if spotifyArtist.Genres != nil && len(spotifyArtist.Genres) > 0 {
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

func GetUsersTopArtists(c *gin.Context) {
	var err error
	var token oauth2.Token
	var artistRanking models.ArtistRanking = models.ArtistRanking{make([]models.TopArtist, 0)}

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query spotify.ID parametrs -> time_range
		timeRange, timeRange_ok := c.GetQuery("time_range")

		if timeRange_ok {
			// get user's top artists
			spotifyOptions := spotify.Options{Timerange: &timeRange}
			spotifyArtistArr, err := spotifyClient.CurrentUsersTopArtistsOpt(&spotifyOptions)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			totalNumOfSpotifyArtists := len(spotifyArtistArr.Artists)

			for i := 0; i < totalNumOfSpotifyArtists; i++ {
				// create models artist
				artist := models.TopArtist{}

				// get user's top artist
				spotifyArtist := spotifyArtistArr.Artists[i]

				// name
				artist.Name = spotifyArtist.Name

				// genre
				if spotifyArtist.Genres != nil && len(spotifyArtist.Genres) > 0 {
					artist.Genre = spotifyArtist.Genres[0]
				}

				// image
				artist.Image = spotifyArtist.Images[0].URL

				// add artist to ranking
				artistRanking.Artists = append(artistRanking.Artists, artist)
			}

			// send artistRanking as JSON
			c.JSON(http.StatusOK, artistRanking)
		}
	}
}

func GetUsersTopTracks(c *gin.Context) {
	var err error
	var token oauth2.Token
	var trackRanking models.TrackRanking = models.TrackRanking{make([]models.TopTrack, 0)}

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// query spotify.ID parametrs -> time_range
		timeRange, timeRange_ok := c.GetQuery("time_range")

		if timeRange_ok {
			// get user's top tracks
			spotifyOptions := spotify.Options{Timerange: &timeRange}
			spotifyTracksArr, err := spotifyClient.CurrentUsersTopTracksOpt(&spotifyOptions)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			totalNumOfSpotifyTracks := len(spotifyTracksArr.Tracks)

			for i := 0; i < totalNumOfSpotifyTracks; i++ {
				// create models track
				track := models.TopTrack{}

				// get user's top track
				spotifyTrack := spotifyTracksArr.Tracks[i]

				// name
				track.Name = spotifyTrack.Name

				// artist name
				track.ArtistName = ""
				spotifyTrackArtists := spotifyTrack.Artists

				for a := 0; a < len(spotifyTrackArtists); a++ {
					if a != len(spotifyTrackArtists)-1 {
						track.ArtistName += spotifyTrackArtists[a].Name + ", "
					} else {
						track.ArtistName += spotifyTrackArtists[a].Name
					}
				}

				// album name
				track.AlbumName = spotifyTrack.Album.Name

				// album image
				track.AlbumImage = spotifyTrack.Album.Images[0].URL

				// preview URL
				track.PreviewURL = spotifyTrack.PreviewURL

				// add track to ranking
				trackRanking.Tracks = append(trackRanking.Tracks, track)
			}

			// send trackRanking as JSON
			c.JSON(http.StatusOK, trackRanking)
		}
	}
}

func GenSeeds(spotifyClient spotify.Client) ([]spotify.ID, []spotify.ID, []string, error) {
	// get seed artist and genre
	var artistSeed []spotify.ID = make([]spotify.ID, 0)
	var genreSeed []string = make([]string, 0)

	spotifyArtistsArr, err := spotifyClient.CurrentUsersTopArtists()
	if err != nil {
		return nil, nil, nil, err
	}

	artist := spotifyArtistsArr.Artists[0]
	artistSeed = append(artistSeed, artist.ID)
	if artist.Genres != nil && len(artist.Genres) > 0 {
		genreSeed = append(genreSeed, artist.Genres[0])
	}

	// get seed track
	var trackSeed []spotify.ID = make([]spotify.ID, 0)

	spotifyTracksArr, err := spotifyClient.CurrentUsersTopTracks()
	if err != nil {
		return nil, nil, nil, err
	}

	track := spotifyTracksArr.Tracks[0]
	trackSeed = append(trackSeed, track.ID)

	return artistSeed, trackSeed, genreSeed, nil
}

func GetUsersRecommendations(c *gin.Context) {
	var err error
	var token oauth2.Token
	var recommendations models.TrackRanking = models.TrackRanking{make([]models.TopTrack, 0)}

	// payload -> ouath2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient := NewSpotifyClient(&token)

		// gen seeds
		artistSeed, trackSeed, genreSeed, err := GenSeeds(spotifyClient)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		seeds := spotify.Seeds{
			Artists: artistSeed,
			Tracks:  trackSeed,
			Genres:  genreSeed,
		}

		spotifyRecommendations, err := spotifyClient.GetRecommendations(seeds, nil, nil)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		spotifyTracksArr := spotifyRecommendations.Tracks
		totalNumOfSpotifyTracks := len(spotifyTracksArr)

		for i := 0; i < totalNumOfSpotifyTracks; i++ {
			// create ranking track
			track := models.TopTrack{}

			// get recommended track
			spotifyTrack := spotifyTracksArr[i]

			// name
			track.Name = spotifyTrack.Name

			// artist name
			track.ArtistName = ""
			spotifyTrackArtists := spotifyTrack.Artists

			for a := 0; a < len(spotifyTrackArtists); a++ {
				if a != len(spotifyTrackArtists)-1 {
					track.ArtistName += spotifyTrackArtists[a].Name + ", "
				} else {
					track.ArtistName += spotifyTrackArtists[a].Name
				}
			}

			// get full spotify track
			spotifyFullTrack, err := spotifyClient.GetTrack(spotifyTrack.ID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			spotifyAlbum := spotifyFullTrack.Album

			// album name
			track.AlbumName = spotifyAlbum.Name

			// album image
			track.AlbumImage = spotifyAlbum.Images[0].URL

			// preview URL
			track.PreviewURL = spotifyTrack.PreviewURL

			// add track to recommendations
			recommendations.Tracks = append(recommendations.Tracks, track)
		}

		// send recommdations as JSON
		c.JSON(http.StatusOK, recommendations)
	}
}
