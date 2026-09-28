class Solution {
    public int[] findSwapValues(int[] a, int[] b) {
        long difference = 0;
        for (int x : a) {
            difference += x;
        }
        for (int y : b) {
            difference -= y;
        }
        if (difference % 2 != 0) {
            return new int[0];
        }
        long shift = difference / 2;
        Set<Long> bValues = new HashSet<>();
        for (int y : b) {
            bValues.add((long) y);
        }
        int[] candidates = a.clone();
        Arrays.sort(candidates);
        for (int x : candidates) {
            if (bValues.contains(x - shift)) {
                return new int[] {x, (int) (x - shift)};
            }
        }
        return new int[0];
    }
}
