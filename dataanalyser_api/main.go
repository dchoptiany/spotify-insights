package main

import (
	"data_analyser/routes"
)

func main() {
	r, _ := routes.SetUpRoutes()
	r.Run(":6060")
}
