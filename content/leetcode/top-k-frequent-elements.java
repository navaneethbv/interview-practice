class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        List<List<Integer>> buckets = new ArrayList<>();
        for (int frequency = 0; frequency <= nums.length; frequency++) {
            buckets.add(new ArrayList<>());
        }
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            buckets.get(entry.getValue()).add(entry.getKey());
        }
        return collect(buckets, k);
    }

    private int[] collect(List<List<Integer>> buckets, int k) {
        int[] result = new int[k];
        int index = 0;
        for (int frequency = buckets.size() - 1; frequency >= 0; frequency--) {
            for (int value : buckets.get(frequency)) {
                result[index++] = value;
                if (index == k) {
                    return result;
                }
            }
        }
        return result;
    }
}
