class Solution {
    public int numSteps(String s) {
        int carry = 0;
        int steps = 0;
        for (int index = s.length() - 1; index > 0; index--) {
            int bit = s.charAt(index) - '0' + carry;
            if (bit == 1) {
                steps += 2;
                carry = 1;
            } else {
                steps++;
            }
        }
        return steps + carry;
    }
}
