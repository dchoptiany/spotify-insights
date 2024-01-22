package models

type DataSketchRequest struct {
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
}

type DataSketchOperation struct {
	Genre  string `json:"genre"`
	Decade string `json:"decade"`
}

type DataSketchOperationRequest struct {
	StartDate      string                `json:"start_date"`
	EndDate        string                `json:"end_date"`
	OperationsData []DataSketchOperation `json:"data"`
}
