class Solution {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        for (int index = 0; index < flowerbed.length; index++) {
            if (flowerbed[index] != 0) {
                continue;
            }
            boolean leftIsEmpty = index == 0 || flowerbed[index - 1] == 0;
            boolean rightIsEmpty = index == flowerbed.length - 1
                    || flowerbed[index + 1] == 0;
            if (leftIsEmpty && rightIsEmpty) {
                flowerbed[index] = 1;
                n--;
            }
        }

        return n <= 0;
    }
}
