package routes

import (
	"dataanalyser_api/controllers"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes() (*gin.Engine, error) {
	r := gin.Default()

	// route gropus
	playlist := r.Group("/playlist")
	userSaved := r.Group("/user")
	dataSketch := r.Group("/data_sketch")

	// playlist analysis
	playlist.GET("/analyse", controllers.GetPlaylistAnalysis)

	// user analysis
	userSaved.GET("/analyse", controllers.GetUsersTracksAnalysis)

	// global trends
	dataSketch.GET("/trends", controllers.GetGlobalTrends)

	return r, nil
}
