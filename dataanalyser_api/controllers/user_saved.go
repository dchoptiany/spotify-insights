package controllers

import (
	"bytes"
	"dataanalyser_api/config"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func GetUsersTracksAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token

	// paylod -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		client := &http.Client{}

		// create GET request
		path := fmt.Sprint(config.DatacollectorAddr, config.Datacollector_GetUsersSavedTracks_Endpoint)

		data, err := json.Marshal(token)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		req, err := http.NewRequest(http.MethodGet, path, bytes.NewBuffer(data))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		req.Header.Set("Content-Type", "application/json")

		// send GET request to data collector
		resp, err := client.Do(req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
		defer resp.Body.Close()

		// read response from data collector
		resp_data, err := io.ReadAll(resp.Body)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// analysis
		analysisOutput, err := RunAnalyseProfile(resp_data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// send response back to UI
		c.JSON(http.StatusOK, analysisOutput)
	}
}
