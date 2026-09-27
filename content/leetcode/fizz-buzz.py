class Solution:
    def fizzBuzz(self, n):
        result = []
        for value in range(1, n + 1):
            text = ""
            if value % 3 == 0:
                text += "Fizz"
            if value % 5 == 0:
                text += "Buzz"
            result.append(text or str(value))
        return result
