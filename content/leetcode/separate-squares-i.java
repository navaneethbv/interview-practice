class Solution {
    public double separateSquares(int[][] squares) {
        long[][] events = new long[squares.length * 2][2];
        java.math.BigInteger totalArea = java.math.BigInteger.ZERO;
        for (int i = 0; i < squares.length; i++) {
            long bottom = squares[i][1];
            long side = squares[i][2];
            totalArea = totalArea.add(java.math.BigInteger.valueOf(side * side));
            events[2 * i] = new long[]{bottom, side};
            events[2 * i + 1] = new long[]{bottom + side, -side};
        }
        java.util.Arrays.sort(events, (first, second) -> Long.compare(first[0], second[0]));

        java.math.BigInteger areaBelow = java.math.BigInteger.ZERO;
        long activeWidth = 0;
        long currentY = events[0][0];
        int eventIndex = 0;
        while (eventIndex < events.length) {
            long nextY = events[eventIndex][0];
            if (nextY > currentY && activeWidth > 0) {
                long height = nextY - currentY;
                java.math.BigInteger stripArea = java.math.BigInteger.valueOf(activeWidth)
                        .multiply(java.math.BigInteger.valueOf(height));
                java.math.BigInteger candidateArea = areaBelow.add(stripArea);
                if (candidateArea.shiftLeft(1).compareTo(totalArea) >= 0) {
                    java.math.BigInteger remainingTwice = totalArea.subtract(areaBelow.shiftLeft(1));
                    double fraction = remainingTwice.doubleValue() / (2.0 * activeWidth);
                    return currentY + fraction;
                }
                areaBelow = candidateArea;
            }
            currentY = nextY;
            while (eventIndex < events.length && events[eventIndex][0] == currentY) {
                activeWidth += events[eventIndex][1];
                eventIndex++;
            }
        }
        return currentY;
    }
}
