class Solution {
    public int[] sortValleyPeak(int[] array) {
        int[] result = array.clone();
        for (int index = 1; index < result.length; index += 2) {
            int largest = largestNear(result, index);
            int temp = result[index];
            result[index] = result[largest];
            result[largest] = temp;
        }
        return result;
    }

    private int largestNear(int[] values, int index) {
        int largest = index;
        if (values[index - 1] > values[largest]) {
            largest = index - 1;
        }
        if (index + 1 < values.length && values[index + 1] > values[largest]) {
            largest = index + 1;
        }
        return largest;
    }
}
