class Solution {
    public boolean canCross(int[][] furniture, int d) {
        int n = furniture.length;
        boolean[] reached = new boolean[n];
        reached[0] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        long limit = (long) d * d;
        while (!queue.isEmpty()) {
            int current = queue.poll();
            for (int other = 0; other < n; other++) {
                if (!reached[other] && gapSquared(furniture[current], furniture[other]) <= limit) {
                    reached[other] = true;
                    queue.add(other);
                }
            }
        }
        return reached[n - 1];
    }

    private long gapSquared(int[] a, int[] b) {
        long dx = Math.max(0, Math.max((long) b[0] - a[2], (long) a[0] - b[2]));
        long dy = Math.max(0, Math.max((long) b[1] - a[3], (long) a[1] - b[3]));
        return dx * dx + dy * dy;
    }
}
