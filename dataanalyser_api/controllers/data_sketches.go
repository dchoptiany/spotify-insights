package controllers

import (
	"dataanalyser_api/config"
	"dataanalyser_api/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func UpdateDataSketches() error {
	client := &http.Client{}

	// create GET request
	path := fmt.Sprint(config.DatacollectorAddr, config.Datacollector_GetTrendTracks_Endpoint)

	req, err := http.NewRequest(http.MethodGet, path, nil)
	if err != nil {
		return err
	}

	// send GET request to data collector
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// read response from data collector
	resp_data, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	// update sketches
	_, err = RunAnalysePlaylist(resp_data)

	if err != nil {
		return err
	}

	return nil
}

func GetGlobalTrends(c *gin.Context) {
	var err error
	var dataRequest models.DataSketchRequest

	if err = c.BindJSON(&dataRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// TODO: Add condition / cyclic refreshment
		// update data sketches
		err = UpdateDataSketches()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// marshal request
		data, err := json.Marshal(dataRequest)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// run data sketches
		analysisOutput, err := RunAnalyseGlobalTrends(data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// send response back to UI
		c.JSON(http.StatusOK, analysisOutput)
	}
}
