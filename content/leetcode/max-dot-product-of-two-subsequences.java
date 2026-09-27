class Solution {
public int maxDotProduct(int[] nums1, int[] nums2) {
    int[] previous = new int[nums2.length + 1];
    Arrays.fill(previous, -1000000000);
    for (int firstValue : nums1) {
        int[] current = new int[nums2.length + 1];
        Arrays.fill(current, -1000000000);
        for (int secondIndex = 1; secondIndex <= nums2.length; secondIndex++) {
            int product = firstValue * nums2[secondIndex - 1];
            int take = product + Math.max(0, previous[secondIndex - 1]);
            current[secondIndex] = Math.max(
                take,
                Math.max(previous[secondIndex], current[secondIndex - 1])
            );
        }
        previous = current;
    }
    return previous[nums2.length];
}
}
