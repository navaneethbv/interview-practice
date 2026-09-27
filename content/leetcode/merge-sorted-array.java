class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int first = m - 1;
        int second = n - 1;
        int writeIndex = m + n - 1;
        while (second >= 0) {
            if (first >= 0 && nums1[first] > nums2[second]) {
                nums1[writeIndex] = nums1[first];
                first--;
            } else {
                nums1[writeIndex] = nums2[second];
                second--;
            }
            writeIndex--;
        }
    }
}
