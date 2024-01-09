package models

import (
	"context"
	"os"

	"github.com/google/uuid"
	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
)

type SpotifyAuthCredentials struct {
	ClientID     string `json:"clientID" binding:"required"`
	ClientSecret string `json:"clientSecret" binding:"required"`
}

type Client struct {
	SpotifyAuthCredentials
	AuthConfig    *clientcredentials.Config
	Token         *oauth2.Token
	SpotifyClient spotify.Client
	Uuid          uuid.UUID `json:"Uuid"`
}

func CreateClient() Client {
	// read credentials from env variables
	spotifyClientID := os.Getenv("SPOTIFY_CLIENT_ID")
	spotifyClientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")

	c := Client{}
	c.ClientID = spotifyClientID
	c.ClientSecret = spotifyClientSecret
	c.Authenticate()
	//c.SpotifyClient = spotify.Authenticator{}.NewClient(c.Token)
	httpClient := spotifyauth.New().Client(context.Background(), c.Token)
	c.SpotifyClient = *spotify.New(httpClient)
	c.GenUUID()

	return c
}

func (c *Client) GenUUID() {
	c.Uuid = uuid.New()
}

func (c *Client) GetClient() *Client {
	return c
}

func (c *Client) Authenticate() error {
	var err error

	c.AuthConfig = &clientcredentials.Config{
		ClientID:     c.ClientID,
		ClientSecret: c.ClientSecret,
		TokenURL:     spotifyauth.TokenURL,
	}

	c.Token, err = c.AuthConfig.Token(context.Background())

	return err
}
