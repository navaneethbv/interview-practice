class Solution {
    public String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) {
            return "";
        }
        int firstLength = str1.length();
        int secondLength = str2.length();
        while (secondLength != 0) {
            int remainder = firstLength % secondLength;
            firstLength = secondLength;
            secondLength = remainder;
        }
        return str1.substring(0, firstLength);
    }
}
