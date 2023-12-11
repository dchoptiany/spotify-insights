package config

const (
	SpotifyInsightsRootDir = "/spotify-insights"
	DataAnalyserCliBinary  = SpotifyInsightsRootDir + "/dataanalyser_api/dataanalyser_cli"
	DataAnalyserTmpFiles   = SpotifyInsightsRootDir + "/dataanalyser_api/tmp"

	DatacollectorAddr                             = "http://docker-gateway:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
)
