package routes

import (
	"data_analyser/controllers"

	"github.com/gin-gonic/gin"
)

func SetUpRoutes() (*gin.Engine, error) {
	r := gin.Default()

	// route gropus
	playlist := r.Group("/playlist")

	// playlist analysis
	playlist.GET("/analyse", controllers.GetPlaylistAnalysis)

	return r, nil
}
