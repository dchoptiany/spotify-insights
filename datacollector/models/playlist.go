package models

type SpotifyArtist struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type SpotifyTrack struct {
	ID           string          `json:"id"`
	Title        string          `json:"title"`
	Artists      []SpotifyArtist `json:"artists"`
	Genre        string          `json:"genre"`
	Release_date string          `json:"release_date"`
	Duration     int             `json:"duration_ms"`
	Popularity   int             `json:"popularity"`
	Energy       float32         `json:"energy"`
	Danceability float32         `json:"danceability"`
}

type SpotifyPlaylist struct {
	Tracks []SpotifyTrack `json:"tracks"`
}
