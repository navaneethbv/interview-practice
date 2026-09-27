class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int left = 0;
        int right = arr.length - k;
        while (left < right) {
            int middle = left + (right - left) / 2;
            int leftDistance = x - arr[middle];
            int rightDistance = arr[middle + k] - x;
            if (leftDistance > rightDistance) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int index = left; index < left + k; index++) {
            result.add(arr[index]);
        }
        return result;
    }
}
