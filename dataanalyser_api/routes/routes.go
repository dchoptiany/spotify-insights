package routes

import (
	"dataanalyser_api/controllers"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes() (*gin.Engine, error) {
	r := gin.Default()

	// route gropus
	playlist := r.Group("/playlist")
	userSaved := r.Group("/user_saved")

	// playlist analysis
	playlist.GET("/analyse", controllers.GetPlaylistAnalysis)
	userSaved.GET("/analyse", controllers.GetUsersTracksAnalysis)

	return r, nil
}
