class Solution:
    def combinationSum(self, candidates, target):
        sorted_candidates = sorted(candidates)
        result = []

        def search(start_index, remaining, path):
            if remaining == 0:
                result.append(path[:])
                return

            for index in range(start_index, len(sorted_candidates)):
                value = sorted_candidates[index]
                if value > remaining:
                    break

                path.append(value)
                search(index, remaining - value, path)
                path.pop()

        search(0, target, [])
        return result
