class Solution:
    def areSimilar(self, mat, k):
        columns = len(mat[0])
        shift = k % columns
        for row in mat:
            for column in range(columns):
                if row[column] != row[(column + shift) % columns]:
                    return False
        return True
