package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func GetUsersTracksAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token

	// paylod -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {

	}
}
