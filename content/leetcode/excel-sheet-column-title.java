class Solution {
    public String convertToTitle(int columnNumber) {
        StringBuilder letters = new StringBuilder();

        while (columnNumber > 0) {
            columnNumber--;
            letters.append((char) ('A' + columnNumber % 26));
            columnNumber /= 26;
        }

        return letters.reverse().toString();
    }
}
