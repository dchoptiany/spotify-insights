package models

type DataSketchesTrack struct {
	Artist SpotifyArtist `json:"artist"`
	Genre  string        `json:"genre"`
}

type DataSketchesPlaylist struct {
	Tracks []DataSketchesTrack `json:"tracks"`
}
