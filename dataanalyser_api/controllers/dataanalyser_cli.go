package controllers

import (
	"fmt"
	"os"
	"os/exec"

	"dataanalyser_api/config"
)

func RunAnalysePlaylist(jsonData []byte) ([]byte, error) {
	var err error

	// create temporary sample.json
	f, err := os.CreateTemp(config.DataAnalyserTmpFiles, "playlist-*.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()

	if _, err := f.Write(jsonData); err != nil {
		return nil, err
	}

	// run dataanalyser
	out, err := exec.Command(fmt.Sprint(config.AnalysePlaylistBinary), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}

func RunAnalyseProfile(jsonData []byte) ([]byte, error) {
	var err error

	// create temporary sample.json
	f, err := os.CreateTemp(config.DataAnalyserTmpFiles, "profile-*.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()

	if _, err := f.Write(jsonData); err != nil {
		return nil, err
	}

	// run dataanalyser
	out, err := exec.Command(fmt.Sprint(config.AnalyseProfileBinary), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}

func RunAnalyseGlobalTrends(jsonData []byte) ([]byte, error) {
	var err error

	// create temporary sample.json
	f, err := os.CreateTemp(config.DataAnalyserTmpFiles, "trends-*.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()

	if _, err := f.Write(jsonData); err != nil {
		return nil, err
	}

	// run dataanalyser
	out, err := exec.Command(fmt.Sprint(config.AnalyseGlobalTrendsBinary), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}

func RunUpdateDataSketches(jsonData []byte) ([]byte, error) {
	var err error

	// create temporary sample.json
	f, err := os.CreateTemp(config.DataAnalyserTmpFiles, "data-*.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()

	if _, err := f.Write(jsonData); err != nil {
		return nil, err
	}

	// run dataanalyser
	out, err := exec.Command(fmt.Sprint(config.UpdateDataSketchesBinary), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}

func RunAnalyseGlobalTrendsCustom(jsonData []byte) ([]byte, error) {
	var err error

	// create temporary sample.json
	f, err := os.CreateTemp(config.DataAnalyserTmpFiles, "operation-data-*.json")
	if err != nil {
		return nil, err
	}
	defer f.Close()

	if _, err := f.Write(jsonData); err != nil {
		return nil, err
	}

	// run dataanalyser
	out, err := exec.Command(fmt.Sprint(config.AnalyseGlobalTrendsCustom), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}
