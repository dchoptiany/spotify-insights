package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"dataanalyser_api/config"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func GetPlaylistAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token

	// paylod -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			client := &http.Client{}

			// create GET request
			path := fmt.Sprint(config.DatacollectorAddr, config.Datacollector_GetPlaylistForAnalysis_Endpoint, "?", "playlist_id=", playlistID)

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
			analysisOutput, err := RunDataAnalyserCli(resp_data)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			// send response back to UI
			c.JSON(http.StatusOK, analysisOutput)

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}
