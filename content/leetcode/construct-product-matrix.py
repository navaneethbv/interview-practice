class Solution:
    def constructProductMatrix(self, grid):
        rows = len(grid)
        columns = len(grid[0])
        answer = [[1] * columns for _ in range(rows)]
        product = 1
        for index in range(rows * columns):
            row, column = divmod(index, columns)
            answer[row][column] = product
            product = product * grid[row][column] % 12345
        product = 1
        for index in range(rows * columns - 1, -1, -1):
            row, column = divmod(index, columns)
            answer[row][column] = answer[row][column] * product % 12345
            product = product * grid[row][column] % 12345
        return answer
