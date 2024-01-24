package routes

import (
	"dataanalyser_api/controllers"

	"github.com/gin-gonic/gin"
)

// Define endpoints and their handlers
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

	// global trends custom operation
	dataSketch.GET("/trends/operation", controllers.GetGlobalTrendsOperation)

	return r, nil
}
