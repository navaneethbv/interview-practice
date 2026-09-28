class Solution {
    public int[] missingNumbers(int[] arr, int low, int high) {
        List<Integer> missing = new ArrayList<>();
        int index = 0;
        for (long value = low; value <= high; value++) {
            while (index < arr.length && arr[index] < value) {
                index++;
            }
            if (index == arr.length || arr[index] != value) {
                missing.add((int) value);
            }
        }
        return missing.stream().mapToInt(Integer::intValue).toArray();
    }
}
