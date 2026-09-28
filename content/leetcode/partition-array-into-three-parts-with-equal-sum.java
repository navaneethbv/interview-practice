class Solution {
    public boolean canThreePartsEqualSum(int[] arr) {
        int total = 0;
        for (int value : arr) {
            total += value;
        }
        if (total % 3 != 0) {
            return false;
        }
        int target = total / 3;
        int partial = 0;
        int parts = 0;
        for (int value : arr) {
            partial += value;
            if (partial == target) {
                parts++;
                partial = 0;
            }
        }
        return parts >= 3;
    }
}
