class SnapshotArray {
    private final List<List<int[]>> history = new ArrayList<>();
    private int version = 0;

    public SnapshotArray(int length) {
        for (int index = 0; index < length; index++) {
            List<int[]> entries = new ArrayList<>();
            entries.add(new int[]{0, 0});
            history.add(entries);
        }
    }

    public void set(int index, int val) {
        List<int[]> entries = history.get(index);
        int[] latest = entries.get(entries.size() - 1);
        if (latest[0] == version) {
            latest[1] = val;
        } else {
            entries.add(new int[]{version, val});
        }
    }

    public int snap() {
        int savedVersion = version;
        version++;
        return savedVersion;
    }

    public int get(int index, int snap_id) {
        List<int[]> entries = history.get(index);
        int left = 0;
        int right = entries.size();
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (entries.get(middle)[0] <= snap_id) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return entries.get(left - 1)[1];
    }
}
