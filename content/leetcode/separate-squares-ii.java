class Solution {
    private long[] coveredLength;
    private int[] coverCount;
    private int[] coordinates;

    private void update(int node, int left, int right, int start, int end, int delta) {
        if (start <= left && right <= end) {
            coverCount[node] += delta;
        } else {
            int middle = (left + right) / 2;
            if (start <= middle) {
                update(node * 2, left, middle, start, end, delta);
            }
            if (end > middle) {
                update(node * 2 + 1, middle + 1, right, start, end, delta);
            }
        }
        recalculate(node, left, right);
    }

    private void recalculate(int node, int left, int right) {
        if (coverCount[node] > 0) {
            coveredLength[node] = (long) coordinates[right + 1] - coordinates[left];
        } else if (left == right) {
            coveredLength[node] = 0;
        } else {
            coveredLength[node] = coveredLength[node * 2] + coveredLength[node * 2 + 1];
        }
    }

    public double separateSquares(int[][] squares) {
        TreeSet<Integer> coordinateSet = new TreeSet<>();
        for (int[] square : squares) {
            coordinateSet.add(square[0]);
            coordinateSet.add(square[0] + square[2]);
        }
        coordinates = coordinateSet.stream().mapToInt(Integer::intValue).toArray();
        int intervalCount = coordinates.length - 1;
        coveredLength = new long[4 * intervalCount];
        coverCount = new int[4 * intervalCount];

        Map<Integer, Integer> coordinateIndex = new HashMap<>();
        for (int index = 0; index < coordinates.length; index++) {
            coordinateIndex.put(coordinates[index], index);
        }
        List<int[]> events = buildEvents(squares, coordinateIndex);
        events.sort(Comparator.comparingInt(event -> event[0]));

        List<long[]> strips = new ArrayList<>();
        long totalArea = 0;
        long previousY = events.get(0)[0];
        for (int[] event : events) {
            if (event[0] > previousY) {
                strips.add(new long[]{previousY, event[0], coveredLength[1]});
                totalArea += (event[0] - previousY) * coveredLength[1];
                previousY = event[0];
            }
            update(1, 0, intervalCount - 1, event[2], event[3], event[1]);
        }
        return findHalfway(strips, totalArea, previousY);
    }

    private List<int[]> buildEvents(int[][] squares, Map<Integer, Integer> coordinateIndex) {
        List<int[]> events = new ArrayList<>();
        for (int[] square : squares) {
            int left = coordinateIndex.get(square[0]);
            int right = coordinateIndex.get(square[0] + square[2]) - 1;
            events.add(new int[]{square[1], 1, left, right});
            events.add(new int[]{square[1] + square[2], -1, left, right});
        }
        return events;
    }

    private double findHalfway(List<long[]> strips, long totalArea, long topY) {
        long accumulatedArea = 0;
        for (long[] strip : strips) {
            long stripArea = (strip[1] - strip[0]) * strip[2];
            if (2 * (accumulatedArea + stripArea) >= totalArea) {
                if (2 * accumulatedArea == totalArea) {
                    return strip[0];
                }
                long remainingDoubledArea = totalArea - 2 * accumulatedArea;
                return strip[0] + (double) remainingDoubledArea / (2.0 * strip[2]);
            }
            accumulatedArea += stripArea;
        }
        return topY;
    }
}
