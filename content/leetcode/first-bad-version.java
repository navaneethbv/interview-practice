class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int lower = 1;
        int upper = n;
        while (lower < upper) {
            int middle = lower + (upper - lower) / 2;
            if (isBadVersion(middle)) {
                upper = middle;
            } else {
                lower = middle + 1;
            }
        }
        return lower;
    }
}
