class Solution {
    public int[] prevPermOpt1(int[] arr) {
        int[] result = arr.clone();
        int i = result.length - 2;
        while (i >= 0 && result[i] <= result[i + 1]) {
            i--;
        }
        if (i < 0) {
            return result;
        }
        int j = result.length - 1;
        while (result[j] >= result[i]) {
            j--;
        }
        while (j > i + 1 && result[j - 1] == result[j]) {
            j--;
        }
        int tmp = result[i];
        result[i] = result[j];
        result[j] = tmp;
        return result;
    }
}
