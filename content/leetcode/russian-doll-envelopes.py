from bisect import bisect_left


class Solution:
    def maxEnvelopes(self, envelopes):
        sorted_envelopes = sorted(
            envelopes, key=lambda envelope: (envelope[0], -envelope[1])
        )
        increasing_heights = []

        for _, height in sorted_envelopes:
            position = bisect_left(increasing_heights, height)
            if position == len(increasing_heights):
                increasing_heights.append(height)
            else:
                increasing_heights[position] = height

        return len(increasing_heights)
