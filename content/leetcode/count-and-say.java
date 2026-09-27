class Solution {
    public String countAndSay(int n) {
        String term = "1";

        for (int iteration = 1; iteration < n; iteration++) {
            StringBuilder nextTerm = new StringBuilder();
            int index = 0;
            while (index < term.length()) {
                int end = index + 1;
                while (end < term.length() && term.charAt(end) == term.charAt(index)) {
                    end++;
                }
                nextTerm.append(end - index).append(term.charAt(index));
                index = end;
            }
            term = nextTerm.toString();
        }
        return term;
    }
}
