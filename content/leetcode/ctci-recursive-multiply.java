class Solution {
    public int multiply(int a, int b) {
        int smaller = Math.min(a, b);
        int bigger = Math.max(a, b);
        return product(smaller, bigger);
    }

    private int product(int smaller, int bigger) {
        if (smaller == 0) {
            return 0;
        }
        if (smaller == 1) {
            return bigger;
        }
        int half = product(smaller >> 1, bigger);
        int doubled = half + half;
        return (smaller & 1) == 1 ? doubled + bigger : doubled;
    }
}
