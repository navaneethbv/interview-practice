class Solution {
    public int maximumProduct(int[] nums) {
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        int largestProduct = ordered[ordered.length - 1]
                * ordered[ordered.length - 2] * ordered[ordered.length - 3];
        int negativePairProduct = ordered[0] * ordered[1] * ordered[ordered.length - 1];
        return Math.max(largestProduct, negativePairProduct);
    }
}
