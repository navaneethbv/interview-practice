class Solution {
    public List<int[]> solve(int[] a, int[] b) {
        int[] points = {a[0], a[1], b[0], b[1]};
        Arrays.sort(points);
        List<int[]> answer = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            int left = points[i];
            int right = points[i + 1];
            boolean inA = a[0] <= left && left < a[1];
            boolean inB = b[0] <= left && left < b[1];
            if (left < right && inA != inB) {
                if (!answer.isEmpty() && answer.get(answer.size() - 1)[1] == left) {
                    answer.get(answer.size() - 1)[1] = right;
                } else {
                    answer.add(new int[] {left, right});
                }
            }
        }
        return answer;
    }
}
