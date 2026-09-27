class Solution {
    public List<Integer> arraysIntersection(int[] arr1, int[] arr2, int[] arr3) {
        int first = 0;
        int second = 0;
        int third = 0;
        List<Integer> result = new ArrayList<>();
        while (first < arr1.length && second < arr2.length && third < arr3.length) {
            int smallest = Math.min(arr1[first], Math.min(arr2[second], arr3[third]));
            if (arr1[first] == arr2[second] && arr2[second] == arr3[third]) {
                result.add(smallest);
            }
            if (arr1[first] == smallest) {
                first++;
            }
            if (arr2[second] == smallest) {
                second++;
            }
            if (arr3[third] == smallest) {
                third++;
            }
        }
        return result;
    }
}
