class Solution {
    public List<Integer> jumpingNumbers(int n) {
        List<Integer> found = new ArrayList<>();
        for (int first = 1; first <= 9; first++) {
            grow(first, n, found);
        }
        Collections.sort(found);
        return found;
    }

    private void grow(long number, int n, List<Integer> found) {
        if (number >= n) {
            return;
        }
        found.add((int) number);
        long last = number % 10;
        if (last > 0) {
            grow(number * 10 + last - 1, n, found);
        }
        if (last < 9) {
            grow(number * 10 + last + 1, n, found);
        }
    }
}
