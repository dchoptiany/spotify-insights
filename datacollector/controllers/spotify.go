package controllers

import (
	"github.com/zmb3/spotify"
	"golang.org/x/oauth2"
)

func NewSpotifyClient(token *oauth2.Token) spotify.Client {
	SpotifyClient := spotify.Authenticator{}.NewClient(token)
	return SpotifyClient
}
