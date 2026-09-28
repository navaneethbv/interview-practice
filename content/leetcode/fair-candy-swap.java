class Solution {
    public int[] fairCandySwap(int[] aliceSizes, int[] bobSizes) {
        int difference = (total(bobSizes) - total(aliceSizes)) / 2;
        Set<Integer> available = new HashSet<>();
        for (int size : bobSizes) {
            available.add(size);
        }
        for (int aliceBox : aliceSizes) {
            int bobBox = aliceBox + difference;
            if (available.contains(bobBox)) {
                return new int[]{aliceBox, bobBox};
            }
        }
        return new int[0];
    }

    private int total(int[] sizes) {
        int sum = 0;
        for (int size : sizes) {
            sum += size;
        }
        return sum;
    }
}
