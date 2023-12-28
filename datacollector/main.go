package main

import (
	"spotify_insights/datacollector/controllers"
	"spotify_insights/datacollector/routes"
	// spotify GO wrapper
)

func main() {
	r, _ := routes.SetUpRoutes()
	controllers.SetUpControllerManager()
	r.Run()
}
