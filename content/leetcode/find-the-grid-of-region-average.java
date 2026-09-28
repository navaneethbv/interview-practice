class Solution {
    public int[][] resultGrid(int[][] image, int threshold) {
        int rows = image.length;
        int columns = image[0].length;
        int[][] totalAverages = new int[rows][columns];
        int[][] regionCounts = new int[rows][columns];
        for (int top = 0; top < rows - 2; top++) {
            for (int left = 0; left < columns - 2; left++) {
                if (!isValidRegion(image, top, left, threshold)) {
                    continue;
                }
                int average = regionAverage(image, top, left);
                addRegion(top, left, average, totalAverages, regionCounts);
            }
        }
        return buildResult(image, totalAverages, regionCounts);
    }

    private boolean isValidRegion(int[][] image, int top, int left, int threshold) {
        for (int row = top; row < top + 3; row++) {
            for (int column = left; column < left + 3; column++) {
                if (row < top + 2
                        && Math.abs(image[row][column] - image[row + 1][column]) > threshold) {
                    return false;
                }
                if (column < left + 2
                        && Math.abs(image[row][column] - image[row][column + 1]) > threshold) {
                    return false;
                }
            }
        }
        return true;
    }

    private int regionAverage(int[][] image, int top, int left) {
        int sum = 0;
        for (int row = top; row < top + 3; row++) {
            for (int column = left; column < left + 3; column++) {
                sum += image[row][column];
            }
        }
        return sum / 9;
    }

    private void addRegion(int top, int left, int average,
                           int[][] totalAverages, int[][] regionCounts) {
        for (int row = top; row < top + 3; row++) {
            for (int column = left; column < left + 3; column++) {
                totalAverages[row][column] += average;
                regionCounts[row][column]++;
            }
        }
    }

    private int[][] buildResult(int[][] image, int[][] totalAverages, int[][] regionCounts) {
        int[][] result = new int[image.length][image[0].length];
        for (int row = 0; row < image.length; row++) {
            for (int column = 0; column < image[0].length; column++) {
                result[row][column] = regionCounts[row][column] == 0
                        ? image[row][column]
                        : totalAverages[row][column] / regionCounts[row][column];
            }
        }
        return result;
    }
}
