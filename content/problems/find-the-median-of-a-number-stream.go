import "sort"

type MedianOfAStream struct {
	values []int
}

func Constructor() MedianOfAStream {
	return MedianOfAStream{}
}

func (this *MedianOfAStream) InsertNum(num int) {
	i := sort.SearchInts(this.values, num)
	this.values = append(this.values, 0)
	copy(this.values[i+1:], this.values[i:])
	this.values[i] = num
}

func (this *MedianOfAStream) FindMedian() float64 {
	n := len(this.values)
	if n%2 == 1 {
		return float64(this.values[n/2])
	}
	return float64(this.values[n/2-1]+this.values[n/2]) / 2
}
