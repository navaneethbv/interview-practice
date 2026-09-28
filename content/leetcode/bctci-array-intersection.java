class Solution {
    public int[] intersection(int[] arr1, int[] arr2) {
        int[] common = new int[Math.min(arr1.length, arr2.length)];
        int count = 0;
        int i = 0;
        int j = 0;
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] == arr2[j]) {
                common[count++] = arr1[i];
                i++;
                j++;
            } else if (arr1[i] < arr2[j]) {
                i++;
            } else {
                j++;
            }
        }
        return Arrays.copyOf(common, count);
    }
}
