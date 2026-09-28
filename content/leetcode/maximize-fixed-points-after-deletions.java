class Solution {
    public int maxFixedPoints(int[] nums) {
        List<int[]> candidates = new ArrayList<>();
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] <= index) {
                candidates.add(new int[] {
                    nums[index], index - nums[index]
                }
                );
            }
        }
        candidates.sort(Comparator.comparingInt(value -> value[0]));
        int[] tree = new int[nums.length + 1];
        int answer = 0;
        int index = 0;
        while (index < candidates.size()) {
            int next = processGroup(candidates, index, tree);
            answer = Math.max(answer, groupBest);
            index = next;
        }
        return answer;
    }
    private int groupBest;
    private int processGroup(List<int[]> candidates, int start, int[] tree) {
        groupBest = 0;
        int index = start;
        List<int[]> pending = new ArrayList<>();
        while (index < candidates.size()
        && candidates.get(index)[0] == candidates.get(start)[0]) {
            int difference = candidates.get(index)[1];
            int best = query(tree, difference + 1);
            groupBest = Math.max(groupBest, best + 1);
            pending.add(new int[] {
                difference + 1, best + 1
            }
            );
            index++;
        }
        for (int[] update : pending) {
            update(tree, update[0], update[1]);
        }
        return index;
    }
    private int query(int[] tree, int position) {
        int answer = 0;
        while (position > 0) {
            answer = Math.max(answer, tree[position]);
            position -= position & -position;
        }
        return answer;
    }
    private void update(int[] tree, int position, int value) {
        while (position < tree.length) {
            tree[position] = Math.max(tree[position], value);
            position += position & -position;
        }
    }
}
