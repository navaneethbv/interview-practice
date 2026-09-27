class Solution {
    public List<Integer> countSmaller(int[] nums) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        Map<Integer, Integer> ranks = new HashMap<>();
        for (int value : sorted) {
            ranks.putIfAbsent(value, ranks.size() + 1);
        }
        int[] tree = new int[ranks.size() + 1];
        Integer[] answer = new Integer[nums.length];
        for (int index = nums.length - 1; index >= 0; index--) {
            int rank = ranks.get(nums[index]);
            answer[index] = query(tree, rank - 1);
            update(tree, rank);
        }
        return Arrays.asList(answer);
    }

    private int query(int[] tree, int index) {
        int total = 0;
        while (index > 0) {
            total += tree[index];
            index -= index & -index;
        }
        return total;
    }

    private void update(int[] tree, int index) {
        while (index < tree.length) {
            tree[index]++;
            index += index & -index;
        }
    }
}
