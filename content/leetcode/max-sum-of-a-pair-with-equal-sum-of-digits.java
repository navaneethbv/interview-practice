class Solution {
    public int maximumSum(int[] nums) {
        Map<Integer, Integer> best = new HashMap<>();
        int answer = -1;
        for (int x : nums) {
            int key = 0;
            for (int v = x; v > 0; v /= 10) {
                key += v % 10;
            }
            Integer previous = best.get(key);
            if (previous != null) {
                answer = Math.max(answer, previous + x);
                best.put(key, Math.max(previous, x));
            } else {
                best.put(key, x);
            }
        }
        return answer;
    }
}
