class Solution:
    def totalFruit(self, fruits):
        counts = {}
        left = 0
        best = 0
        for right, fruit in enumerate(fruits):
            counts[fruit] = counts.get(fruit, 0) + 1
            while len(counts) > 2:
                leaving = fruits[left]
                counts[leaving] -= 1
                left += 1
                if counts[leaving] == 0:
                    del counts[leaving]
            best = max(best, right - left + 1)
        return best
