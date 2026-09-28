class Solution:
    def canCross(self, stones):
        jumps = {position: set() for position in stones}
        jumps[0].add(0)
        for position in stones:
            for previous_jump in jumps[position]:
                for jump_size in (previous_jump - 1, previous_jump, previous_jump + 1):
                    landing = position + jump_size
                    if jump_size > 0 and landing in jumps:
                        jumps[landing].add(jump_size)
        return bool(jumps[stones[-1]])
