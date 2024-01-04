package config

const (
	SpotifyInsightsRootDir = "/spotify-insights"

	AnalyseGlobalTrendsBinary = SpotifyInsightsRootDir + "/dataanalyser_api/AnalyseGlobalTrends"
	AnalysePlaylistBinary     = SpotifyInsightsRootDir + "/dataanalyser_api/AnalysePlaylist"
	AnalyseProfileBinary      = SpotifyInsightsRootDir + "/dataanalyser_api/AnalyseProfile"
	UpdateDataSketchesBinary  = SpotifyInsightsRootDir + "/dataanalyser_api/UpdateDataSketches"
	DataAnalyserTestsBinary   = SpotifyInsightsRootDir + "/dataanalyser_api/DataAnalyserTests"

	DataAnalyserTmpFiles = SpotifyInsightsRootDir + "/dataanalyser_api/tmp"

	DatacollectorAddr                             = "http://docker-gateway:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
	Datacollector_GetUsersSavedTracks_Endpoint    = "/spotify-api/user/saved/analysis"
	Datacollector_GetTopTracks_Endpoint           = "" // Refresh Data Sketches
)
