class Solution:
    def pyramidTransition(self, bottom, allowed):
        from collections import defaultdict
        from functools import lru_cache
        rules = defaultdict(list)
        for triple in allowed:
            rules[triple[:2]].append(triple[2])
        @lru_cache(None)
        def build(row):
            if len(row) == 1:
                return True
            def extend(index, next_row):
                if index == len(row) - 1:
                    return build(next_row)
                pair = row[index:index + 2]
                return any(
                    extend(index + 1, next_row + character)
                    for character in rules[pair]
                )
            return extend(0, "")
        return build(bottom)
