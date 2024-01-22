package controllers

import (
	"context"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
)

// Create new spotify.Client based on verified token
func NewSpotifyClient(token *oauth2.Token) spotify.Client {
	httpClient := spotifyauth.New().Client(context.Background(), token)
	SpotifyClient := *spotify.New(httpClient)

	return SpotifyClient
}
