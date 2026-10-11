function numIslands(grid: string[][]): number {
    const rows = grid.length, cols = grid[0].length;
    const sink = (r: number, c: number): void => {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
        grid[r][c] = "0";
        sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
    };
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1") { count++; sink(r, c); }
        }
    }
    return count;
}
