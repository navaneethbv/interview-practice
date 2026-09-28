class Solution:
    def suggestedProducts(self, products, searchWord):
        import bisect
        products.sort()
        result = []
        for length in range(1, len(searchWord) + 1):
            prefix = searchWord[:length]
            start = bisect.bisect_left(products, prefix)
            suggestions = [product for product in products[start:start + 3] if product.startswith(prefix)]
            result.append(suggestions)
        return result
