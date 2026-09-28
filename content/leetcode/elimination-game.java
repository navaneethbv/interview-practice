class Solution {
    public int lastRemaining(int n) {
        int firstValue = 1;
        int step = 1;
        boolean leftToRight = true;
        int remaining = n;
        while (remaining > 1) {
            if (leftToRight || remaining % 2 == 1) {
                firstValue += step;
            }
            remaining /= 2;
            step *= 2;
            leftToRight = !leftToRight;
        }
        return firstValue;
    }
}
