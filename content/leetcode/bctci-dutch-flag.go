func dutchFlagSort(arr []byte) {
	red, current, blue := 0, 0, len(arr)-1
	for current <= blue {
		switch arr[current] {
		case 'R':
			arr[red], arr[current] = arr[current], arr[red]
			red++
			current++
		case 'B':
			arr[current], arr[blue] = arr[blue], arr[current]
			blue--
		default:
			current++
		}
	}
}
