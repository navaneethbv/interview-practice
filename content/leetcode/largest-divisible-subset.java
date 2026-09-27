class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int[] lengths = new int[nums.length];
        int[] previousIndex = new int[nums.length];
        Arrays.fill(lengths, 1);
        Arrays.fill(previousIndex, -1);
        int bestIndex = 0;

        for (int current = 0; current < nums.length; current++) {
            for (int previous = 0; previous < current; previous++) {
                if (nums[current] % nums[previous] == 0
                        && lengths[previous] + 1 > lengths[current]) {
                    lengths[current] = lengths[previous] + 1;
                    previousIndex[current] = previous;
                }
            }
            if (lengths[current] > lengths[bestIndex]) {
                bestIndex = current;
            }
        }

        List<Integer> subset = new ArrayList<>();
        while (bestIndex >= 0) {
            subset.add(nums[bestIndex]);
            bestIndex = previousIndex[bestIndex];
        }
        return subset;
    }
}
