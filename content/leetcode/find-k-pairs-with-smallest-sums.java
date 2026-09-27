class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> pairs = new ArrayList<>();
        if (nums1.length == 0 || nums2.length == 0 || k == 0) {
            return pairs;
        }

        PriorityQueue<int[]> heap = new PriorityQueue<>((first, second) -> {
            long firstSum = (long) nums1[first[0]] + nums2[first[1]];
            long secondSum = (long) nums1[second[0]] + nums2[second[1]];
            return Long.compare(firstSum, secondSum);
        });

        for (int firstIndex = 0; firstIndex < Math.min(k, nums1.length); firstIndex++) {
            heap.add(new int[]{firstIndex, 0});
        }

        while (!heap.isEmpty() && pairs.size() < k) {
            int[] entry = heap.remove();
            int firstIndex = entry[0];
            int secondIndex = entry[1];
            pairs.add(Arrays.asList(nums1[firstIndex], nums2[secondIndex]));

            int nextSecond = secondIndex + 1;
            if (nextSecond < nums2.length) {
                heap.add(new int[]{firstIndex, nextSecond});
            }
        }
        return pairs;
    }
}
