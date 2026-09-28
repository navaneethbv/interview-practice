class Solution {
    public int[] mergeThree(int[] arr1, int[] arr2, int[] arr3) {
        int[][] arrays = {arr1, arr2, arr3};
        int[] positions = new int[3];
        List<Integer> merged = new ArrayList<>();
        while (true) {
            int source = -1;
            for (int k = 0; k < 3; k++) {
                if (positions[k] < arrays[k].length
                        && (source == -1 || arrays[k][positions[k]] < arrays[source][positions[source]])) {
                    source = k;
                }
            }
            if (source == -1) {
                break;
            }
            int value = arrays[source][positions[source]++];
            if (merged.isEmpty() || merged.get(merged.size() - 1) != value) {
                merged.add(value);
            }
        }
        return merged.stream().mapToInt(Integer::intValue).toArray();
    }
}
