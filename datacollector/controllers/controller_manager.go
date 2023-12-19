package controllers

import (
	"fmt"
	"spotify_insights/datacollector/models"

	"github.com/google/uuid"
)

type ControllerManager struct {
	clients map[uuid.UUID]models.Client
}

var CM ControllerManager

func SetUpControllerManager() {
	CM = ControllerManager{clients: make(map[uuid.UUID]models.Client)}
}

func (cm *ControllerManager) AddClient(client models.Client) {
	cm.clients[client.Uuid] = client
}

func (cm *ControllerManager) GetClientByUUID(uuid uuid.UUID) (*models.Client, error) {
	if val, ok := cm.clients[uuid]; ok {
		return &val, nil
	}
	return nil, fmt.Errorf("No such client UUID: " + uuid.String())
}
