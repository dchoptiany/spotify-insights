package models

type UserInfo struct {
	Name                  string `json:"name"`
	NumOfFollowers        int    `json:"num_of_followers"`
	NumOfFollowingArtists int    `json:"num_of_following_artists"`
	Image                 string `json:"image"`
}
