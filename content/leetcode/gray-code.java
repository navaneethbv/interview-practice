class Solution {
    public List<Integer> grayCode(int n) {
        List<Integer> values = new ArrayList<>();
        for (int number = 0; number < (1 << n); number++) {
            values.add(number ^ (number >> 1));
        }
        return values;
    }
}
