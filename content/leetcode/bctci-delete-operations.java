class Solution {
    public int[] applyDeletes(int[] nums, int[] operations) {
        boolean[] deleted = new boolean[nums.length];
        Integer[] order = new Integer[nums.length];
        for (int i = 0; i < nums.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b));
        int pointer = 0;
        for (int operation : operations) {
            if (operation >= 0) {
                deleted[operation] = true;
                continue;
            }
            while (pointer < order.length && deleted[order[pointer]]) {
                pointer++;
            }
            if (pointer < order.length) {
                deleted[order[pointer]] = true;
            }
        }
        List<Integer> remaining = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (!deleted[i]) {
                remaining.add(nums[i]);
            }
        }
        return remaining.stream().mapToInt(Integer::intValue).toArray();
    }
}
