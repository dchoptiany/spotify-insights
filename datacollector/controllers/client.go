package controllers

import (
	"log"
	"net/http"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

type SpotifyUser struct {
	Token *oauth2.Token
	Uuid  uuid.UUID `json:"Uuid"`
}

func NewClient(credentials models.SpotifyAuthCredentials) (models.Client, error) {
	var err error

	client := models.Client{
		SpotifyAuthCredentials: models.SpotifyAuthCredentials{
			ClientID:     credentials.ClientID,
			ClientSecret: credentials.ClientSecret,
		},
	}

	client.GenUUID()
	err = client.Authenticate()
	if err != nil {
		log.Println("ERROR: Wrong authentication")
		return models.Client{}, err
	}

	client.SpotifyClient = spotify.Authenticator{}.NewClient(client.Token)

	return client, nil
}

func SpotifyUserAuthenticate(c *gin.Context) {
	var err error
	var credentials models.SpotifyAuthCredentials
	var spotifyClient models.Client

	if err = c.BindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// create spotify client
		spotifyClient, err = NewClient(credentials)
		if err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
		} else {
			CM.AddClient(spotifyClient)
			c.JSON(http.StatusOK, SpotifyUser{Token: spotifyClient.Token, Uuid: spotifyClient.Uuid})
		}
	}
}
