class Solution:
    def hasProductTriplet(self, words, target):
        sums = {sum(ord(letter) - ord("a") + 1 for letter in word) for word in words}
        for first in sums:
            for second in sums:
                product = first * second
                if target % product == 0 and target // product in sums:
                    return True
        return False
