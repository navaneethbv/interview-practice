class Solution {
    public long numberOfPairs(int[] nums1, int[] nums2, int diff) {
        int[] differences = new int[nums1.length];
        int[] sorted = new int[nums1.length];
        for (int index = 0; index < nums1.length; index++) {
            differences[index] = nums1[index] - nums2[index];
            sorted[index] = differences[index];
        }
        Arrays.sort(sorted);
        int[] tree = new int[sorted.length + 1];
        long answer = 0;
        for (int value : differences) {
            int limit = upperBound(sorted, value + diff);
            answer += prefixSum(tree, limit);
            int position = lowerBound(sorted, value) + 1;
            add(tree, position);
        }
        return answer;
    }

    private int lowerBound(int[] values, int target) {
        int left = 0;
        int right = values.length;
        while (left < right) {
            int middle = (left + right) / 2;
            if (values[middle] < target) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }

    private int upperBound(int[] values, int target) {
        int left = 0;
        int right = values.length;
        while (left < right) {
            int middle = (left + right) / 2;
            if (values[middle] <= target) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }

    private int prefixSum(int[] tree, int position) {
        int answer = 0;
        while (position > 0) {
            answer += tree[position];
            position -= position & -position;
        }
        return answer;
    }

    private void add(int[] tree, int position) {
        while (position < tree.length) {
            tree[position]++;
            position += position & -position;
        }
    }
}
