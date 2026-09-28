class Solution {
    public void dutchFlagSort(char[] arr) {
        int red = 0;
        int current = 0;
        int blue = arr.length - 1;
        while (current <= blue) {
            if (arr[current] == 'R') {
                swap(arr, red++, current++);
            } else if (arr[current] == 'B') {
                swap(arr, current, blue--);
            } else {
                current++;
            }
        }
    }

    private void swap(char[] arr, int i, int j) {
        char temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
