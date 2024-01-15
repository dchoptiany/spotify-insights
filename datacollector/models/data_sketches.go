package models

type DataSketchesTrack struct {
	ID           string `json:"id"`
	Genre        string `json:"genre"`
	Release_date string `json:"release_date"`
}

type DataSketchesPlaylist struct {
	Tracks []DataSketchesTrack `json:"tracks"`
}

type DataSketchesPlaylistList struct {
	Playlists []DataSketchesPlaylist `json:"playlists"`
}
