class Solution {
    public String getPermutation(int n, int k) {
        int[] factorials = new int[n + 1];
        factorials[0] = 1;
        List<Integer> available = new ArrayList<>();

        for (int value = 1; value <= n; value++) {
            factorials[value] = factorials[value - 1] * value;
            available.add(value);
        }

        k--;
        StringBuilder permutation = new StringBuilder();
        while (!available.isEmpty()) {
            int blockSize = factorials[available.size() - 1];
            int selectedIndex = k / blockSize;
            k %= blockSize;
            permutation.append(available.remove(selectedIndex));
        }
        return permutation.toString();
    }
}
