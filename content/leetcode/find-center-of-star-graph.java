class Solution {
    public int findCenter(int[][] edges) {
        int first = edges[0][0];
        if (first == edges[1][0] || first == edges[1][1]) {
            return first;
        }
        return edges[0][1];
    }
}
