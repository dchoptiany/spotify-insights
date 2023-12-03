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

	spotifyAPI.GET("/playlist/analysis", controllers.GetPlaylistForAnalysis)

	return r, nil
}
