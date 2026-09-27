class Solution:
    def fizzBuzz(self, n):
        return [('Fizz' if i%3==0 else '')+('Buzz' if i%5==0 else '') or str(i) for i in range(1,n+1)]
