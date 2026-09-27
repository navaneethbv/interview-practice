class Solution {
public double separateSquares(int[][] squares) {
    double totalArea = 0;
    double left = Double.POSITIVE_INFINITY;
    double right = 0;
    for (int[] square : squares) {
        totalArea += (double) square[2] * square[2];
        left = Math.min(left, square[1]);
        right = Math.max(right, (double) square[1] + square[2]);
    }
    double target = totalArea / 2;
    for (int iteration = 0; iteration < 90; iteration++) {
        double middle = (left + right) / 2;
        double below = 0;
        for (int[] square : squares) {
            double heightBelow = Math.max(0, Math.min(square[2], middle - square[1]));
            below += square[2] * heightBelow;
        }
        if (below >= target) {
            right = middle;
        } else {
            left = middle;
        }
    }
    return right;
}
}
