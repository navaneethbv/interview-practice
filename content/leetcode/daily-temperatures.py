class Solution:
    def dailyTemperatures(self, temperatures):
        pending = []
        result = [0] * len(temperatures)
        for index, temperature in enumerate(temperatures):
            while pending and temperatures[pending[-1]] < temperature:
                previous = pending.pop()
                result[previous] = index - previous
            pending.append(index)
        return result
