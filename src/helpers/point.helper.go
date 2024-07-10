package helpers

import (
    "fmt"
)

// Point struct to represent latitude and longitude
type Point struct {
    Latitude  float64 `json:"latitude"`
    Longitude float64 `json:"longitude"`
}

// Convert Point to WKT (Well-Known Text) format
func (p Point) ToWKT() string {
    return fmt.Sprintf("POINT(%f %f)", p.Longitude, p.Latitude)
}

// Convert WKT to Point
func WKTToPoint(wkt string) (Point, error) {
    var point Point
    _, err := fmt.Sscanf(wkt, "POINT(%f %f)", &point.Longitude, &point.Latitude)
    return point, err
}
