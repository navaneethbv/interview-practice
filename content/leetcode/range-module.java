class RangeModule {
    private List<int[]> ranges = new ArrayList<>();

    public RangeModule() {
    }

    public void addRange(int left, int right) {
        List<int[]> merged = new ArrayList<>();
        for (int[] range : ranges) {
            if (range[1] < left) {
                merged.add(range);
            } else if (range[0] > right) {
                merged.add(new int[]{left, right});
                left = range[0];
                right = range[1];
            } else {
                left = Math.min(left, range[0]);
                right = Math.max(right, range[1]);
            }
        }
        merged.add(new int[]{left, right});
        ranges = merged;
    }

    public boolean queryRange(int left, int right) {
        for (int[] range : ranges) {
            if (range[0] <= left && right <= range[1]) {
                return true;
            }
        }
        return false;
    }

    public void removeRange(int left, int right) {
        List<int[]> remaining = new ArrayList<>();
        for (int[] range : ranges) {
            if (range[1] <= left || range[0] >= right) {
                remaining.add(range);
                continue;
            }
            if (range[0] < left) {
                remaining.add(new int[]{range[0], left});
            }
            if (range[1] > right) {
                remaining.add(new int[]{right, range[1]});
            }
        }
        ranges = remaining;
    }
}
