class Solution:
    def robotMoves(self, seq):
        expansions = [""] * (len(seq) + 2)
        for index in range(len(seq) - 1, -1, -1):
            if seq[index] == "2":
                expansions[index] = expansions[index + 1] + expansions[index + 2]
            else:
                expansions[index] = seq[index] + expansions[index + 1]
        return expansions[0]
