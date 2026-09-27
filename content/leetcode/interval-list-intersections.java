class Solution {
    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
        int firstIndex = 0;
        int secondIndex = 0;
        List<int[]> intersections = new ArrayList<>();
        while (firstIndex < firstList.length && secondIndex < secondList.length) {
            int start = Math.max(firstList[firstIndex][0], secondList[secondIndex][0]);
            int end = Math.min(firstList[firstIndex][1], secondList[secondIndex][1]);
            if (start <= end) {
                intersections.add(new int[]{start, end});
            }
            if (firstList[firstIndex][1] < secondList[secondIndex][1]) {
                firstIndex++;
            } else {
                secondIndex++;
            }
        }
        return intersections.toArray(new int[0][]);
    }
}
