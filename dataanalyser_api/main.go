package main

import (
	"dataanalyser_api/routes"
)

func main() {
	r, _ := routes.SetUpRoutes()
	r.Run(":6060")
}
