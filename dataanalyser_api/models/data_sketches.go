package models

// Represents user's input payload in GlobalTrendsAnalysis
type DataSketchRequest struct {
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
}

// Represents user's 'filters' used in GlobalTrendsCustomAnalysis
type DataSketchOperation struct {
	Genre  string `json:"genre"`
	Decade string `json:"decade"`
}

// Represents user's input payload in GlobalTrendsCustomAnalysis
type DataSketchOperationRequest struct {
	StartDate      string                `json:"start_date"`
	EndDate        string                `json:"end_date"`
	OperationsData []DataSketchOperation `json:"data"`
}
