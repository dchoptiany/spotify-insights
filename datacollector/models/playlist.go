package models

// Represents Spotify's artist
type SpotifyArtist struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// Represents Spotify's track
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

// Represents Spotify's playlist
type SpotifyPlaylist struct {
	Tracks []SpotifyTrack `json:"tracks"`
}

// Keep basic info about Spotify's playlist
type PlaylistInfo struct {
	Name           string `json:"Name"`
	OwnerName      string `json:"Owner_name"`
	Desc           string `json:"Description"`
	Image          string `json:"Image"`
	NumOfFollowers int    `json:"Num_of_followers"`
}
