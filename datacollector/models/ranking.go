package models

// Keeps info about Spotify's artist based on User's Top Artists
type TopArtist struct {
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Image string `json:"image"`
}

// Represents ranking of User's Top Artists
type ArtistRanking struct {
	Artists []TopArtist `json:"artists"`
}

// Keeps info about Spotify's track based on User's Top Tracks
type TopTrack struct {
	Name       string `json:"name"`
	ArtistName string `json:"artist_name"`
	AlbumName  string `json:"album_name"`
	AlbumImage string `json:"album_image"`
	PreviewURL string `json:"preview_url"`
}

// Represents ranking of User's Top Tracks
type TrackRanking struct {
	Tracks []TopTrack `json:"tracks"`
}
