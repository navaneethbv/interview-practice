class Solution {
    public long solve(String s) {
        long answer = 0;
        int run = 0;
        for (int i = 0; i < s.length(); i++) {
            run = s.charAt(i) == 'a' ? 0 : run + 1;
            answer += run;
        }
        return answer;
    }
}
