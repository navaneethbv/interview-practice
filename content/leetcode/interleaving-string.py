class Solution:
    def isInterleave(self, s1, s2, s3):
        if len(s1) + len(s2) != len(s3):
            return False

        reachable = [False] * (len(s2) + 1)
        reachable[0] = True

        for first_index in range(len(s1) + 1):
            for second_index in range(len(s2) + 1):
                if first_index == 0 and second_index == 0:
                    continue

                from_first = (
                    first_index > 0
                    and reachable[second_index]
                    and s1[first_index - 1] == s3[first_index + second_index - 1]
                )
                from_second = (
                    second_index > 0
                    and reachable[second_index - 1]
                    and s2[second_index - 1] == s3[first_index + second_index - 1]
                )
                reachable[second_index] = from_first or from_second

        return reachable[-1]
