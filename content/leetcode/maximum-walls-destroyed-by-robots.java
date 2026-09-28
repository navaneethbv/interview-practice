class Solution {
    public int maxWalls(int[] robots, int[] distance, int[] walls) {
        int[][] paired = pairRobots(robots, distance);
        Arrays.sort(paired, Comparator.comparingInt(pair -> pair[0]));
        Set<Integer> robotPositions = new HashSet<>();
        for (int robot : robots) {
            robotPositions.add(robot);
        }
        int fixed = 0;
        int[] remainingWalls = collectWalls(walls, robotPositions);
        for (int wall : walls) {
            if (robotPositions.contains(wall)) {
                fixed++;
            }
        }
        int leftScore = count(remainingWalls, paired[0][0] - (long) paired[0][1],
                paired[0][0] - 1);
        int rightScore = 0;
        for (int index = 1; index < paired.length; index++) {
            int[] scores = nextScores(paired[index - 1], paired[index],
                    remainingWalls, leftScore, rightScore);
            leftScore = scores[0];
            rightScore = scores[1];
        }
        int last = paired.length - 1;
        int rightEnd = paired[last][0] + paired[last][1];
        return fixed + Math.max(leftScore,
                rightScore + count(remainingWalls, paired[last][0] + 1, rightEnd));
    }

    private int[][] pairRobots(int[] robots, int[] distance) {
        int[][] paired = new int[robots.length][2];
        for (int index = 0; index < robots.length; index++) {
            paired[index][0] = robots[index];
            paired[index][1] = distance[index];
        }
        return paired;
    }

    private int[] collectWalls(int[] walls, Set<Integer> robots) {
        return Arrays.stream(walls)
                .filter(wall -> !robots.contains(wall))
                .sorted()
                .toArray();
    }

    private int[] nextScores(int[] previous, int[] current, int[] walls,
            int leftScore, int rightScore) {
        long previousPosition = previous[0];
        long position = current[0];
        long rightLimit = Math.min(position - 1, previousPosition + previous[1]);
        long leftLimit = Math.max(previousPosition + 1, position - current[1]);
        int rightPrevious = count(walls, previousPosition + 1, rightLimit);
        int leftCurrent = count(walls, leftLimit, position - 1);
        int overlap = count(walls, leftLimit, rightLimit);
        int nextLeft = Math.max(leftScore + leftCurrent,
                rightScore + rightPrevious + leftCurrent - overlap);
        int nextRight = Math.max(leftScore, rightScore + rightPrevious);
        return new int[] {nextLeft, nextRight};
    }

    private int count(int[] walls, long lower, long upper) {
        if (lower > upper) {
            return 0;
        }
        return lowerBound(walls, upper + 1) - lowerBound(walls, lower);
    }

    private int lowerBound(int[] values, long target) {
        int left = 0;
        int right = values.length;
        while (left < right) {
            int middle = (left + right) / 2;
            if (values[middle] < target) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }
}
