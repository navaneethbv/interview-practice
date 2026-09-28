class Solution:
    HEADINGS = "RDLU"
    STEPS = {"R": (0, 1), "D": (1, 0), "L": (0, -1), "U": (-1, 0)}

    def printKMoves(self, K):
        black = set()
        row = col = 0
        heading = 0
        top = bottom = left = right = 0
        for _ in range(K):
            if (row, col) in black:
                black.remove((row, col))
                heading = (heading + 3) % 4
            else:
                black.add((row, col))
                heading = (heading + 1) % 4
            d_row, d_col = self.STEPS[self.HEADINGS[heading]]
            row, col = row + d_row, col + d_col
            top, bottom = min(top, row), max(bottom, row)
            left, right = min(left, col), max(right, col)
        lines = []
        for r in range(top, bottom + 1):
            cells = []
            for c in range(left, right + 1):
                if (r, c) == (row, col):
                    cells.append(self.HEADINGS[heading])
                else:
                    cells.append("X" if (r, c) in black else "_")
            lines.append("".join(cells))
        return lines
