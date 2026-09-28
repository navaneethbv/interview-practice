class Solution {
    public int numIdenticalPairs(int[] nums) {
        int[] counts = new int[101];
        int answer = 0;
        for (int value : nums) {
            answer += counts[value];
            counts[value]++;
        }
        return answer;
    }
}
