class Solution {
    private int[] minimum;
    private int[] maximum;
    private int[] lazy;
    private int size;

    private void apply(int node, int change) {
        minimum[node] += change;
        maximum[node] += change;
        lazy[node] += change;
    }

    private void push(int node) {
        if (lazy[node] == 0) {
            return;
        }
        apply(node * 2, lazy[node]);
        apply(node * 2 + 1, lazy[node]);
        lazy[node] = 0;
    }

    private void update(int node, int left, int right, int updateLeft, int updateRight, int change) {
        if (updateLeft <= left && right <= updateRight) {
            apply(node, change);
            return;
        }
        push(node);
        int middle = (left + right) / 2;
        if (updateLeft <= middle) {
            update(node * 2, left, middle, updateLeft, updateRight, change);
        }
        if (updateRight > middle) {
            update(node * 2 + 1, middle + 1, right, updateLeft, updateRight, change);
        }
        minimum[node] = Math.min(minimum[node * 2], minimum[node * 2 + 1]);
        maximum[node] = Math.max(maximum[node * 2], maximum[node * 2 + 1]);
    }

    private int firstZero(int node, int left, int right, int end) {
        if (left > end || minimum[node] > 0 || maximum[node] < 0) {
            return size;
        }
        if (left == right) {
            return left;
        }
        push(node);
        int middle = (left + right) / 2;
        int candidate = firstZero(node * 2, left, middle, end);
        if (candidate < size) {
            return candidate;
        }
        return firstZero(node * 2 + 1, middle + 1, right, end);
    }

    public int longestBalanced(int[] nums) {
        size = nums.length;
        minimum = new int[4 * size];
        maximum = new int[4 * size];
        lazy = new int[4 * size];
        Map<Integer, Integer> lastSeen = new HashMap<>();
        int answer = 0;
        for (int index = 0; index < size; index++) {
            int value = nums[index];
            int change = value % 2 == 0 ? 1 : -1;
            int firstStart = lastSeen.getOrDefault(value, -1) + 1;
            update(1, 0, size - 1, firstStart, index, change);
            lastSeen.put(value, index);
            int start = firstZero(1, 0, size - 1, index);
            if (start <= index) {
                answer = Math.max(answer, index - start + 1);
            }
        }
        return answer;
    }
}
