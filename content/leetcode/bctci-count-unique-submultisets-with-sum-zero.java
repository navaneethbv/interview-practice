class Solution {
    public int countZeroSubmultisets(int[] S) {
        TreeMap<Integer, Integer> groups = new TreeMap<>();
        for (int value : S) {
            groups.merge(value, 1, Integer::sum);
        }
        int[] values = new int[groups.size()];
        int[] copies = new int[groups.size()];
        int index = 0;
        for (Map.Entry<Integer, Integer> entry : groups.entrySet()) {
            values[index] = entry.getKey();
            copies[index++] = entry.getValue();
        }
        return count(values, copies, 0, 0);
    }

    private int count(int[] values, int[] copies, int index, long total) {
        if (index == values.length) {
            return total == 0 ? 1 : 0;
        }
        int ways = 0;
        for (int taken = 0; taken <= copies[index]; taken++) {
            ways += count(values, copies, index + 1, total + (long) taken * values[index]);
        }
        return ways;
    }
}
