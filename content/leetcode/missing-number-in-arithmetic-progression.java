class Solution {
    public int missingNumber(int[] arr) {
        int difference = (arr[arr.length - 1] - arr[0]) / arr.length;
        for (int index = 0; index < arr.length; index++) {
            int expected = arr[0] + index * difference;
            if (arr[index] != expected) {
                return expected;
            }
        }
        return arr[0];
    }
}
