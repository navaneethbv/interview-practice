class Solution:
    def dailyTemperatures(self, temperatures):
        stack = []; result = [0]*len(temperatures)
        for i,temp in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < temp:
                previous = stack.pop(); result[previous] = i-previous
            stack.append(i)
        return result
