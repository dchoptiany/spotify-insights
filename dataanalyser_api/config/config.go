package config

const (
	SpotifyInsightsRootDir = "/spotify-insights"

	AnalyseGlobalTrendsBinary = SpotifyInsightsRootDir + "/dataanalyser_api/bin/AnalyseGlobalTrends"
	AnalysePlaylistBinary     = SpotifyInsightsRootDir + "/dataanalyser_api/bin/AnalysePlaylist"
	AnalyseProfileBinary      = SpotifyInsightsRootDir + "/dataanalyser_api/bin/AnalyseProfile"
	UpdateDataSketchesBinary  = SpotifyInsightsRootDir + "/dataanalyser_api/bin/UpdateDataSketches"
	DataAnalyserTestsBinary   = SpotifyInsightsRootDir + "/dataanalyser_api/bin/DataAnalyserTests"

	DataAnalyserTmpFiles = SpotifyInsightsRootDir + "/dataanalyser_api/tmp"

	DatacollectorAddr                             = "http://docker-gateway:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
	Datacollector_GetUsersSavedTracks_Endpoint    = "/spotify-api/user/saved/analysis"
	Datacollector_GetTrendTracks_Endpoint         = "/spotify-api/data-sketches/tracks" // Refresh Data Sketches
)
