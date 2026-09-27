class DetectSquares {
    private final Map<Integer, Integer> points = new HashMap<>();

    public DetectSquares() {
    }

    private int key(int x, int y) {
        return x * 1001 + y;
    }

    public void add(int[] point) {
        int pointKey = key(point[0], point[1]);
        points.merge(pointKey, 1, Integer::sum);
    }

    public int count(int[] point) {
        int queryX = point[0];
        int queryY = point[1];
        int totalSquares = 0;
        for (Map.Entry<Integer, Integer> entry : points.entrySet()) {
            int candidateX = entry.getKey() / 1001;
            int candidateY = entry.getKey() % 1001;
            int side = Math.abs(candidateX - queryX);
            boolean isOppositeCorner = candidateX != queryX
                    && side == Math.abs(candidateY - queryY);
            if (isOppositeCorner) {
                totalSquares += entry.getValue()
                        * points.getOrDefault(key(candidateX, queryY), 0)
                        * points.getOrDefault(key(queryX, candidateY), 0);
            }
        }
        return totalSquares;
    }
}
