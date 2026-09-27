class Solution {
    public boolean canMakeArithmeticProgression(int[] arr) {
        int[] ordered = arr.clone();
        Arrays.sort(ordered);
        int difference = ordered[1] - ordered[0];
        for (int index = 2; index < ordered.length; index++) {
            if (ordered[index] - ordered[index - 1] != difference) {
                return false;
            }
        }
        return true;
    }
}
