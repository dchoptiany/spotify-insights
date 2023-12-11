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

	spotifyAPI.GET("/playlist", controllers.GetSpotifyPlaylist)
	spotifyAPI.GET("/playlist/artists", controllers.GetSpotifyPlaylistsArtists)

	// playlist analysis
	spotifyAPI.GET("/playlist/analysis", controllers.GetPlaylistForAnalysis)

	// data sketches
	spotifyAPI.GET("/data_sketches/global", controllers.GetTopTracksGlobal)
	spotifyAPI.GET("/data_sketches/poland", controllers.GetTopTracksPoland)

	return r, nil
}
