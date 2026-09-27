class Solution {
    public String shortestPalindrome(String s) {
        String reversed = new StringBuilder(s).reverse().toString();
        String combined = s + "#" + reversed;
        int[] prefixLengths = new int[combined.length()];

        for (int index = 1; index < combined.length(); index++) {
            int matched = prefixLengths[index - 1];
            while (matched > 0 && combined.charAt(index) != combined.charAt(matched)) {
                matched = prefixLengths[matched - 1];
            }
            if (combined.charAt(index) == combined.charAt(matched)) {
                matched++;
            }
            prefixLengths[index] = matched;
        }

        int palindromeLength = prefixLengths[prefixLengths.length - 1];
        return reversed.substring(0, s.length() - palindromeLength) + s;
    }
}
