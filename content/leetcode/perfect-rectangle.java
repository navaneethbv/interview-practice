class Solution {
    public boolean isRectangleCover(int[][] rectangles) {
        Set<String> corners = new HashSet<>();
        long coveredArea = 0;
        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        int maxY = Integer.MIN_VALUE;
        for (int[] rectangle : rectangles) {
            int left = rectangle[0];
            int bottom = rectangle[1];
            int right = rectangle[2];
            int top = rectangle[3];
            coveredArea += (long) (right - left) * (top - bottom);
            minX = Math.min(minX, left);
            minY = Math.min(minY, bottom);
            maxX = Math.max(maxX, right);
            maxY = Math.max(maxY, top);
            toggleCorner(corners, left, bottom);
            toggleCorner(corners, left, top);
            toggleCorner(corners, right, bottom);
            toggleCorner(corners, right, top);
        }
        long outerArea = (long) (maxX - minX) * (maxY - minY);
        Set<String> outerCorners = new HashSet<>(Arrays.asList(
                key(minX, minY), key(minX, maxY), key(maxX, minY), key(maxX, maxY)));
        return coveredArea == outerArea && corners.equals(outerCorners);
    }

    private void toggleCorner(Set<String> corners, int x, int y) {
        String corner = key(x, y);
        if (!corners.add(corner)) {
            corners.remove(corner);
        }
    }

    private String key(int x, int y) {
        return x + "," + y;
    }
}
