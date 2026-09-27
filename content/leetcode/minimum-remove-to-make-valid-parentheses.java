class Solution {
    public String minRemoveToMakeValid(String s) {
        boolean[] remove = findUnmatched(s);
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            if (!remove[index]) {
                result.append(s.charAt(index));
            }
        }
        return result.toString();
    }

    private boolean[] findUnmatched(String s) {
        Deque<Integer> unmatchedOpen = new ArrayDeque<>();
        boolean[] remove = new boolean[s.length()];
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (character == '(') {
                unmatchedOpen.push(index);
            } else if (character == ')') {
                if (unmatchedOpen.isEmpty()) {
                    remove[index] = true;
                } else {
                    unmatchedOpen.pop();
                }
            }
        }
        while (!unmatchedOpen.isEmpty()) {
            remove[unmatchedOpen.pop()] = true;
        }
        return remove;
    }
}
