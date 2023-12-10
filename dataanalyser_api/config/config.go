package config

const (
	SpotifyInsightsRootDir = "/home/ola/WORKSPACE/pwr/sem5/zespolowe/UI/spotify-insights"
	SpotifyInsightsRuntime = SpotifyInsightsRootDir + "/spotify-insights/runtime"
	DataAnalyserCliBinary  = SpotifyInsightsRuntime + "/da/bin/data_analyser-linux"
	DataAnalyserTmpFiles   = SpotifyInsightsRuntime + "/da/tmp"

	DatacollectorAddr                             = "http://localhost:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
)
