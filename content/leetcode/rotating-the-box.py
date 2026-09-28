class Solution:

    def rotateTheBox(self, boxGrid):
        m, n = (len(boxGrid), len(boxGrid[0]))
        out = [['.'] * m for _ in range(n)]
        for i, row in enumerate(boxGrid):
            place = n - 1
            for j in range(n - 1, -1, -1):
                if row[j] == '*':
                    out[j][m - i - 1] = '*'
                    place = j - 1
                elif row[j] == '#':
                    out[place][m - i - 1] = '#'
                    place -= 1
        return out
