class Solution:
    def countGoodNumbers(self, n):
        modulus = 1000000007
        even_positions = (n + 1) // 2
        odd_positions = n // 2
        return (pow(5, even_positions, modulus)
                * pow(4, odd_positions, modulus) % modulus)
