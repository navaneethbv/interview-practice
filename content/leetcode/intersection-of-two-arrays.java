class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> firstValues = new HashSet<>();
        Set<Integer> commonValues = new HashSet<>();

        for (int value : nums1) {
            firstValues.add(value);
        }
        for (int value : nums2) {
            if (firstValues.contains(value)) {
                commonValues.add(value);
            }
        }

        return commonValues.stream().mapToInt(Integer::intValue).toArray();
    }
}
