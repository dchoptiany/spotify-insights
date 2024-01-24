package controllers

import (
	"context"
	"log"
	"net/http"
	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
)

// Represents spotify.Client based on key attributes such as Token and UUID
type SpotifyUser struct {
	Token *oauth2.Token
	Uuid  uuid.UUID `json:"Uuid"`
}

// Create Client object based on spotify credentials
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

	httpClient := spotifyauth.New().Client(context.Background(), client.Token)
	client.SpotifyClient = *spotify.New(httpClient)

	return client, nil
}

// Authentication
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
