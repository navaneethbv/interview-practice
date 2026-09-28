class Solution {
    private int inversion(int left, int right, long[] values) {
        return left >= 0 && right >= 0 && values[left] > values[right] ? 1 : 0;
    }

    public int minimumPairRemoval(int[] nums) {
        int size = nums.length;
        long[] values = new long[size];
        int[] previous = new int[size];
        int[] following = new int[size];
        boolean[] alive = new boolean[size];
        Arrays.fill(alive, true);
        PriorityQueue<long[]> pairHeap = new PriorityQueue<>((first, second) ->
                first[0] != second[0] ? Long.compare(first[0], second[0])
                        : Long.compare(first[1], second[1]));

        int inversions = 0;
        for (int index = 0; index < size; index++) {
            values[index] = nums[index];
            previous[index] = index - 1;
            following[index] = index + 1 < size ? index + 1 : -1;
        }
        for (int index = 0; index + 1 < size; index++) {
            pairHeap.add(new long[]{values[index] + values[index + 1], index, index + 1});
            inversions += inversion(index, index + 1, values);
        }

        int operations = 0;
        while (inversions > 0) {
            long[] pair = pairHeap.remove();
            int left = (int) pair[1];
            int right = (int) pair[2];
            if (!alive[left] || !alive[right] || following[left] != right
                    || values[left] + values[right] != pair[0]) {
                continue;
            }

            int before = previous[left];
            int after = following[right];
            inversions -= inversion(before, left, values) + inversion(left, right, values)
                    + inversion(right, after, values);
            values[left] = pair[0];
            alive[right] = false;
            following[left] = after;
            if (after >= 0) {
                previous[after] = left;
            }
            inversions += inversion(before, left, values) + inversion(left, after, values);
            if (before >= 0) {
                pairHeap.add(new long[]{values[before] + values[left], before, left});
            }
            if (after >= 0) {
                pairHeap.add(new long[]{values[left] + values[after], left, after});
            }
            operations++;
        }
        return operations;
    }
}
