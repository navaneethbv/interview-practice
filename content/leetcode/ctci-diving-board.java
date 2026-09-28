class Solution {
    public List<Integer> allLengths(int k, int shorter, int longer) {
        List<Integer> lengths = new ArrayList<>();
        if (k == 0) {
            return lengths;
        }
        if (shorter == longer) {
            lengths.add(k * shorter);
            return lengths;
        }
        for (int longCount = 0; longCount <= k; longCount++) {
            lengths.add(shorter * (k - longCount) + longer * longCount);
        }
        return lengths;
    }
}
