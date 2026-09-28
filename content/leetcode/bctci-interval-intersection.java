class Solution {
    public int[][] intervalIntersection(int[][] arr1, int[][] arr2) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < arr1.length && j < arr2.length) {
            int start = Math.max(arr1[i][0], arr2[j][0]);
            int end = Math.min(arr1[i][1], arr2[j][1]);
            if (start <= end) {
                result.add(new int[] {start, end});
            }
            if (arr1[i][1] < arr2[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return result.toArray(new int[0][]);
    }
}
