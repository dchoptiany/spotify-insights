package controllers

import (
	"dataanalyser_api/models"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
		analysisOutput, err := RunAnalysePlaylist(data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		// send response back to UI
		c.JSON(http.StatusOK, analysisOutput)
	}
}
