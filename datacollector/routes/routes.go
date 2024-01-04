package routes

import (
	"spotify_insights/datacollector/controllers"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes() (*gin.Engine, error) {
	//var err error

	r := gin.Default()

	// route groups
	user := r.Group("/spotify-user")
	spotifyAPI := r.Group("/spotify-api")

	user.PUT("login", controllers.SpotifyUserAuthenticate)

	// playlist
	spotifyAPI.GET("/playlist", controllers.GetSpotifyPlaylist)
	spotifyAPI.GET("/playlist/artists", controllers.GetSpotifyPlaylistsArtists)
	spotifyAPI.GET("/playlist/info", controllers.GetPlaylistInfo)

	// playlist analysis
	spotifyAPI.GET("/playlist/analysis", controllers.GetPlaylistForAnalysis)

	// user analysis
	spotifyAPI.GET("user/info", controllers.GetUserInfo)
	spotifyAPI.GET("user/top/artists", controllers.GetUsersTopArtists)
	spotifyAPI.GET("user/top/tracks", controllers.GetUsersTopTracks)
	spotifyAPI.GET("user/recommendations", controllers.GetUsersRecommendations)
	spotifyAPI.GET("/user/saved/analysis", controllers.GetUsersSavedTracksForAnalysis)

	// data sketches
	spotifyAPI.GET("/data_sketches/tracks", controllers.GetTrendTracks)

	return r, nil
}
