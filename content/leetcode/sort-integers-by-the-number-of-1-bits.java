class Solution {
    public int[] sortByBits(int[] arr) {
        Integer[] values = new Integer[arr.length];
        for (int index = 0; index < arr.length; index++) {
            values[index] = arr[index];
        }
        Arrays.sort(values, (first, second) -> {
            int firstBits = Integer.bitCount(first);
            int secondBits = Integer.bitCount(second);
            if (firstBits != secondBits) {
                return Integer.compare(firstBits, secondBits);
            }
            return Integer.compare(first, second);
        });
        for (int index = 0; index < arr.length; index++) {
            arr[index] = values[index];
        }
        return arr;
    }
}
