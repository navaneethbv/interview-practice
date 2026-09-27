class Solution:
    def canPlaceFlowers(self, flowerbed, n):
        for index in range(len(flowerbed)):
            if flowerbed[index] != 0:
                continue
            left_is_empty = index == 0 or flowerbed[index - 1] == 0
            right_is_empty = (
                index == len(flowerbed) - 1
                or flowerbed[index + 1] == 0
            )
            if left_is_empty and right_is_empty:
                flowerbed[index] = 1
                n -= 1

        return n <= 0
