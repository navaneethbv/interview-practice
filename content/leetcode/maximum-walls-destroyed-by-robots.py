from bisect import bisect_left, bisect_right


class Solution:
    def maxWalls(self, robots, distance, walls):
        paired = sorted(zip(robots, distance))
        robot_positions = set(robots)
        fixed = sum(wall in robot_positions for wall in walls)
        remaining_walls = sorted(wall for wall in walls if wall not in robot_positions)
        first, reach = paired[0]
        left_score = self._count(remaining_walls, first - reach, first - 1)
        right_score = 0
        for index in range(1, len(paired)):
            left_score, right_score = self._next_scores(
                paired[index - 1], paired[index], remaining_walls,
                left_score, right_score
            )
        last, reach = paired[-1]
        return fixed + max(
            left_score,
            right_score + self._count(remaining_walls, last + 1, last + reach),
        )

    def _next_scores(self, previous, current, walls, left_score, right_score):
        previous_position, previous_reach = previous
        position, reach = current
        right_limit = min(position - 1, previous_position + previous_reach)
        left_limit = max(previous_position + 1, position - reach)
        right_previous = self._count(walls, previous_position + 1, right_limit)
        left_current = self._count(walls, left_limit, position - 1)
        overlap = self._count(walls, left_limit, right_limit)
        next_left = max(left_score + left_current,
                        right_score + right_previous + left_current - overlap)
        next_right = max(left_score, right_score + right_previous)
        return next_left, next_right

    def _count(self, walls, lower, upper):
        if lower > upper:
            return 0
        return bisect_right(walls, upper) - bisect_left(walls, lower)
