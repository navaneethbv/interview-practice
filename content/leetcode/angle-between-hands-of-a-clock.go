import "math"

func angleClock(hour int, minutes int) float64 {
	angle := math.Abs(float64(hour%12)*30 + float64(minutes)*0.5 - float64(minutes)*6)
	return math.Min(angle, 360-angle)
}
