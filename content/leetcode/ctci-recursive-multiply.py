class Solution:
    def multiply(self, a, b):
        smaller, bigger = (a, b) if a < b else (b, a)
        return self._product(smaller, bigger)

    def _product(self, smaller, bigger):
        if smaller == 0:
            return 0
        if smaller == 1:
            return bigger
        half = self._product(smaller >> 1, bigger)
        doubled = half + half
        return doubled + bigger if smaller & 1 else doubled
