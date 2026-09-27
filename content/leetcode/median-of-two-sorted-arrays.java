class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int total = nums1.length + nums2.length;
        int left = 0;
        int right = nums1.length;
        while (left <= right) {
            int cut1 = left + (right - left) / 2;
            int cut2 = (total + 1) / 2 - cut1;
            int left1 = before(nums1, cut1);
            int right1 = after(nums1, cut1);
            int left2 = before(nums2, cut2);
            int right2 = after(nums2, cut2);
            if (left1 <= right2 && left2 <= right1) {
                return median(total, Math.max(left1, left2), Math.min(right1, right2));
            }
            if (left1 > right2) {
                right = cut1 - 1;
            } else {
                left = cut1 + 1;
            }
        }
        throw new IllegalArgumentException("Inputs must be sorted");
    }

    private int before(int[] values, int cut) {
        return cut == 0 ? Integer.MIN_VALUE : values[cut - 1];
    }

    private int after(int[] values, int cut) {
        return cut == values.length ? Integer.MAX_VALUE : values[cut];
    }

    private double median(int total, int leftMaximum, int rightMinimum) {
        return total % 2 == 1 ? leftMaximum : (leftMaximum + (double) rightMinimum) / 2;
    }
}
