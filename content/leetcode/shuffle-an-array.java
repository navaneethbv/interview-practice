class Solution {
    private final int[] original;
    private final Random random = new Random(429);

    public Solution(int[] nums) {
        original = nums.clone();
    }

    public int[] reset() {
        return original.clone();
    }

    public int[] shuffle() {
        int[] shuffled = original.clone();
        for (int index = shuffled.length - 1; index > 0; index--) {
            int swapIndex = random.nextInt(index + 1);
            int temporary = shuffled[index];
            shuffled[index] = shuffled[swapIndex];
            shuffled[swapIndex] = temporary;
        }
        return shuffled;
    }
}
