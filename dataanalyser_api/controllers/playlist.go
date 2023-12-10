package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"spotify_insights/datacollector/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

const (
	DatacollectorAddr                             = "http://localhost:8080"
	Datacollector_GetPlaylistForAnalysis_Endpoint = "/spotify-api/playlist/analysis"
)

func GetPlaylistAnalysis(c *gin.Context) {
	var err error
	var token oauth2.Token
	var playlistForAnalysis models.SpotifyPlaylist

	// paylod -> oauth2 token
	if err = c.BindJSON(&token); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		// query string parametrs -> playlistID
		playlistID, playlistID_ok := c.GetQuery("playlist_id")

		if playlistID_ok {
			client := &http.Client{}

			// create GET request
			path := fmt.Sprint(DatacollectorAddr, Datacollector_GetPlaylistForAnalysis_Endpoint, "?", "playlist_id=", playlistID)

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

			err = json.Unmarshal(resp_data, &playlistForAnalysis)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}

			// analysis
			// run cpp program for analysis

			// send response back to UI
			// TODO: Change 'playlistForAnalysis' to cpp program's output!
			c.JSON(http.StatusOK, playlistForAnalysis)

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}
}
