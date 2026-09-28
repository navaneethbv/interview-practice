class Solution:
    def compressByK(self, arr, k):
        runs = []
        for value in arr:
            self._push(runs, value, 1, k)
        return [value for value, count in runs for _ in range(count)]

    def _push(self, runs, value, count, k):
        if runs and runs[-1][0] == value:
            count += runs.pop()[1]
        if count >= k:
            self._push(runs, value * k, count // k, k)
            if count % k:
                runs.append([value, count % k])
        else:
            runs.append([value, count])
