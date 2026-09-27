class Solution {
    private boolean isValid(String text) {
        int balance = 0;
        for (char character : text.toCharArray()) {
            if (character == '(') {
                balance++;
            } else if (character == ')') {
                balance--;
                if (balance < 0) {
                    return false;
                }
            }
        }
        return balance == 0;
    }

    private Set<String> nextLevel(Set<String> texts) {
        Set<String> next = new HashSet<>();
        for (String text : texts) {
            for (int index = 0; index < text.length(); index++) {
                char character = text.charAt(index);
                if (character == '(' || character == ')') {
                    next.add(text.substring(0, index) + text.substring(index + 1));
                }
            }
        }
        return next;
    }

    public List<String> removeInvalidParentheses(String s) {
        Set<String> current = new HashSet<>();
        current.add(s);
        while (true) {
            List<String> validResults = new ArrayList<>();
            for (String text : current) {
                if (isValid(text)) {
                    validResults.add(text);
                }
            }
            if (!validResults.isEmpty()) {
                return validResults;
            }
            current = nextLevel(current);
        }
    }
}
