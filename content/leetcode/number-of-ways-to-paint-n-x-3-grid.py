class Solution:
    def numOfWays(self, n):
        two_color_rows = 6
        three_color_rows = 6
        for _ in range(1, n):
            next_two = (3 * two_color_rows + 2 * three_color_rows) % 1000000007
            next_three = (2 * two_color_rows + 2 * three_color_rows) % 1000000007
            two_color_rows = next_two
            three_color_rows = next_three
        return (two_color_rows + three_color_rows) % 1000000007
