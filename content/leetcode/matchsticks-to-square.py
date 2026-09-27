class Solution:
    def makesquare(self, matchsticks):
        total_length = sum(matchsticks)
        if len(matchsticks) < 4 or total_length % 4 != 0:
            return False
        target_length = total_length // 4
        sticks = sorted(matchsticks, reverse=True)
        if sticks[0] > target_length:
            return False
        return self._place(sticks, 0, [0] * 4, target_length)

    def _place(self, sticks, index, side_lengths, target_length):
        if index == len(sticks):
            return True
        tried_lengths = set()
        stick = sticks[index]
        for side in range(4):
            if side_lengths[side] in tried_lengths:
                continue
            if side_lengths[side] + stick > target_length:
                continue
            tried_lengths.add(side_lengths[side])
            side_lengths[side] += stick
            if self._place(sticks, index + 1, side_lengths, target_length):
                return True
            side_lengths[side] -= stick
        return False
