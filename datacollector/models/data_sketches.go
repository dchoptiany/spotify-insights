package models

type DataSketchesTrack struct {
	Artists []SpotifyArtist `json:"artist"`
	Genre   string          `json:"genre"`
}

type DataSketchesPlaylist struct {
	Tracks []DataSketchesTrack `json:"tracks"`
}
