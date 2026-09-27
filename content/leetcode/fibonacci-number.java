class Solution {
    public int fib(int n) {
        int previous = 0;
        int current = 1;

        for (int index = 0; index < n; index++) {
            int next = previous + current;
            previous = current;
            current = next;
        }
        return previous;
    }
}
