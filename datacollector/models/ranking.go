package models

type TopArtist struct {
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Image string `json:"image"`
}

type ArtistRanking struct {
	Artists []TopArtist `json:"artists"`
}

type TopTrack struct {
	Name       string `json:"name"`
	ArtistName string `json:"artist_name"`
	AlbumName  string `json:"album_name"`
	AlbumImage string `json:"album_image"`
	PreviewURL string `json:"preview_url"`
}

type TrackRanking struct {
	Tracks []TopTrack `json:"tracks"`
}
