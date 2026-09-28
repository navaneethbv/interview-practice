class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums1) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        List<Integer> result = new ArrayList<>();
        for (int value : nums2) {
            int remaining = counts.getOrDefault(value, 0);
            if (remaining > 0) {
                result.add(value);
                counts.put(value, remaining - 1);
            }
        }
        int[] output = new int[result.size()];
        for (int index = 0; index < result.size(); index++) {
            output[index] = result.get(index);
        }
        return output;
    }
}
