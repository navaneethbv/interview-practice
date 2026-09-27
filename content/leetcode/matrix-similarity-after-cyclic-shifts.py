class Solution:
    def areSimilar(self, mat, k):
        n=len(mat[0])
        return all(row[c]==row[(c+k)%n] for row in mat for c in range(n))
