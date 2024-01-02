package config

const (
	SpotifyInsightsRootDir = "/spotify-insights"
	//DataAnalyserCliBinary     = SpotifyInsightsRootDir + "/dataanalyser_api/dataanalyser_cli"
	AnalyseGlobalTrendsBinary = SpotifyInsightsRootDir + "/dataanalyser_api/AnalyseGlobalTrends"
	AnalysePlaylistBinary     = SpotifyInsightsRootDir + "/dataanalyser_api/AnalysePlaylist"
	AnalyseProfileBinary      = SpotifyInsightsRootDir + "/dataanalyser_api/AnalyseProfile"
	DataAnalyserTestsBinary   = SpotifyInsightsRootDir + "/dataanalyser_api/DataAnalyserTests"
	UpdateDataSketchesBinary  = SpotifyInsightsRootDir + "/dataanalyser_api/UpdateDataSketches"
	DataAnalyserTmpFiles      = SpotifyInsightsRootDir + "/dataanalyser_api/tmp"

	DatacollectorAddr                             = "http://docker-gateway:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
	Datacollector_GetUsersSavedTracks_Endpoint    = "/spotify-api/user/saved/analysis"
)
