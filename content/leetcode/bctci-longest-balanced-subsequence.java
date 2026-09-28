class Solution {
    public String longestBalanced(String s) {
        boolean[] keep = new boolean[s.length()];
        Deque<Integer> openers = new ArrayDeque<>();
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == '(') {
                openers.push(index);
            } else if (!openers.isEmpty()) {
                keep[openers.pop()] = true;
                keep[index] = true;
            }
        }
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            if (keep[index]) {
                result.append(s.charAt(index));
            }
        }
        return result.toString();
    }
}
