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

// Gets global data from Data Collector and then runs Data Analyser to update data sketches
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
	_, err = RunUpdateDataSketches(resp_data)

	if err != nil {
		return err
	}

	return nil
}

// Based on request's payload, runs Data Analyser to get global trends in selected period of time
func GetGlobalTrends(c *gin.Context) {
	var err error
	var dataRequest models.DataSketchRequest

	if err = c.BindJSON(&dataRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {

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

// Runs Data Analyser to perfom global trend custom operation based on user's selected period of time / genre / decade
func GetGlobalTrendsOperation(c *gin.Context) {
	var err error
	var operationRequest models.DataSketchOperationRequest

	if err = c.BindJSON(&operationRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// marshal operation request
		data, err := json.Marshal(operationRequest)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// run dataanalyser
		analysisOutput, err := RunAnalyseGlobalTrendsCustom(data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// send response back to UI
		c.JSON(http.StatusOK, analysisOutput)
	}
}
