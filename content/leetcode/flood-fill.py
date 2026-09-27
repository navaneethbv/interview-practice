class Solution:
    def floodFill(self, image, sr, sc, color):
        original_color = image[sr][sc]
        if original_color == color:
            return image
        stack = [(sr,sc)]
        image[sr][sc] = color
        while stack:
            row, column = stack.pop()
            neighbors = ((row - 1, column), (row + 1, column),
                         (row, column - 1), (row, column + 1))
            for next_row, next_column in neighbors:
                in_bounds = (0 <= next_row < len(image)
                             and 0 <= next_column < len(image[0]))
                if in_bounds and image[next_row][next_column] == original_color:
                    image[next_row][next_column] = color
                    stack.append((next_row, next_column))
        return image
