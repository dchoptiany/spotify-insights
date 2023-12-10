package controllers

import (
	"fmt"
	"os"
	"os/exec"

	"dataanalyser_api/config"
)

func RunDataAnalyserCli(jsonData []byte) ([]byte, error) {
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
	out, err := exec.Command(fmt.Sprint(config.DataAnalyserCliBinary), f.Name()).Output()

	if err != nil {
		return nil, err
	}

	return out, nil
}
