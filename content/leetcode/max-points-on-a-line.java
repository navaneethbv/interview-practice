class Solution {
    public int maxPoints(int[][] points) {
        int best = Math.min(2, points.length);

        for (int anchorIndex = 0; anchorIndex < points.length; anchorIndex++) {
            int anchorX = points[anchorIndex][0];
            int anchorY = points[anchorIndex][1];
            Map<String, Integer> slopeCounts = new HashMap<>();

            for (int index = anchorIndex + 1; index < points.length; index++) {
                long deltaX = (long) points[index][0] - anchorX;
                long deltaY = (long) points[index][1] - anchorY;
                long divisor = gcd(deltaX, deltaY);
                deltaX /= divisor;
                deltaY /= divisor;
                if (deltaX < 0 || (deltaX == 0 && deltaY < 0)) {
                    deltaX = -deltaX;
                    deltaY = -deltaY;
                }

                String slope = deltaX + "/" + deltaY;
                int count = slopeCounts.getOrDefault(slope, 0) + 1;
                slopeCounts.put(slope, count);
                best = Math.max(best, count + 1);
            }
        }

        return best;
    }

    private long gcd(long first, long second) {
        first = Math.abs(first);
        second = Math.abs(second);
        while (second != 0) {
            long remainder = first % second;
            first = second;
            second = remainder;
        }
        return first;
    }
}
