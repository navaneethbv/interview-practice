class Solution:
    def getKthMagicNumber(self, k):
        values = [1]
        pointers = [0, 0, 0]
        factors = (3, 5, 7)
        while len(values) < k:
            candidates = [values[pointers[i]] * factors[i] for i in range(3)]
            smallest = min(candidates)
            values.append(smallest)
            for i in range(3):
                if candidates[i] == smallest:
                    pointers[i] += 1
        return values[k - 1]
