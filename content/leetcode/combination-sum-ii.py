class Solution:
    def combinationSum2(self, candidates, target):
        sorted_candidates = sorted(candidates)
        result = []

        def search(start_index, remaining, path):
            if remaining == 0:
                result.append(path[:])
                return

            for index in range(start_index, len(sorted_candidates)):
                if index > start_index and sorted_candidates[index] == sorted_candidates[index - 1]:
                    continue

                value = sorted_candidates[index]
                if value > remaining:
                    break

                path.append(value)
                search(index + 1, remaining - value, path)
                path.pop()

        search(0, target, [])
        return result
