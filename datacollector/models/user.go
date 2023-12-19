package models

import (
	"context"

	"github.com/google/uuid"
	"github.com/zmb3/spotify"
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
		TokenURL:     spotify.TokenURL,
	}

	c.Token, err = c.AuthConfig.Token(context.Background())

	return err
}
