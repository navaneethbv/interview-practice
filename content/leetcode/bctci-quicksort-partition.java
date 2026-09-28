class Solution {
    public void partition(int[] arr, int pivot) {
        int smaller = 0;
        int current = 0;
        int larger = arr.length - 1;
        while (current <= larger) {
            if (arr[current] < pivot) {
                swap(arr, smaller++, current++);
            } else if (arr[current] > pivot) {
                swap(arr, current, larger--);
            } else {
                current++;
            }
        }
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
