class Solution {
    public int numTrees(int n) {
        int[] treeCounts = new int[n + 1];
        treeCounts[0] = 1;
        for (int size = 1; size <= n; size++) {
            for (int leftSize = 0; leftSize < size; leftSize++) {
                int rightSize = size - 1 - leftSize;
                treeCounts[size] += treeCounts[leftSize] * treeCounts[rightSize];
            }
        }
        return treeCounts[n];
    }
}
