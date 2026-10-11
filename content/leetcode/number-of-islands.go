func numIslands(grid [][]byte) int {
	var sink func(r, c int)
	sink = func(r, c int) {
		if r < 0 || c < 0 || r >= len(grid) || c >= len(grid[0]) || grid[r][c] != '1' {
			return
		}
		grid[r][c] = '0'
		sink(r+1, c)
		sink(r-1, c)
		sink(r, c+1)
		sink(r, c-1)
	}
	count := 0
	for r := range grid {
		for c := range grid[r] {
			if grid[r][c] == '1' {
				count++
				sink(r, c)
			}
		}
	}
	return count
}
