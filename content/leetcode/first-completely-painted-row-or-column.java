class Solution {
    public int firstCompleteIndex(int[] arr,int[][] mat){
        int m = mat.length;
        int n = mat[0].length;
        int[][] positions = new int[m * n + 1][2];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                positions[mat[i][j]] = new int[]{i, j};
            }
        }
        int[] rows = new int[m];
        int[] columns = new int[n];
        for (int t = 0; t < arr.length; t++) {
            int i = positions[arr[t]][0];
            int j = positions[arr[t]][1];
            rows[i]++;
            columns[j]++;
            if (rows[i] == n || columns[j] == m) {
                return t;
            }
        }
        return -1;
    }
}
