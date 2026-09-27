class Solution:
    def imageSmoother(self, img):
        rows = len(img)
        columns = len(img[0])
        smoothed = [[0] * columns for _ in range(rows)]
        for row in range(rows):
            for column in range(columns):
                total = 0
                count = 0
                for neighbor_row in range(max(0, row - 1), min(rows, row + 2)):
                    for neighbor_column in range(max(0, column - 1), min(columns, column + 2)):
                        total += img[neighbor_row][neighbor_column]
                        count += 1
                smoothed[row][column] = total // count
        return smoothed
