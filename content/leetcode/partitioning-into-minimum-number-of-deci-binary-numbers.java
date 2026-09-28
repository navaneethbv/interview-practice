class Solution {
    public int minPartitions(String n) {
        int largestDigit = 0;
        for (int index = 0; index < n.length(); index++) {
            largestDigit = Math.max(largestDigit, n.charAt(index) - '0');
        }
        return largestDigit;
    }
}
