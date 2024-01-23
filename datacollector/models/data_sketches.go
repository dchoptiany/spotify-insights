package models

// Represents Spotify's track in data sketches
type DataSketchesTrack struct {
	ID           string `json:"id"`
	Genre        string `json:"genre"`
	Release_date string `json:"release_date"`
}

// Represents Spotify's playlist in data sketches
type DataSketchesPlaylist struct {
	Tracks []DataSketchesTrack `json:"tracks"`
}

// List of selected information about given playlists
type DataSketchesPlaylistList struct {
	Playlists []DataSketchesPlaylist `json:"playlists"`
}
