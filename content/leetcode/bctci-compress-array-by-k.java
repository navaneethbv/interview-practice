class Solution {
    public long[] compressByK(int[] arr, int k) {
        Deque<long[]> runs = new ArrayDeque<>();
        for (int value : arr) {
            push(runs, value, 1, k);
        }
        List<Long> result = new ArrayList<>();
        Iterator<long[]> iterator = runs.descendingIterator();
        while (iterator.hasNext()) {
            long[] run = iterator.next();
            for (long i = 0; i < run[1]; i++) {
                result.add(run[0]);
            }
        }
        return result.stream().mapToLong(Long::longValue).toArray();
    }

    private void push(Deque<long[]> runs, long value, long count, int k) {
        if (!runs.isEmpty() && runs.peek()[0] == value) {
            count += runs.pop()[1];
        }
        if (count >= k) {
            push(runs, value * k, count / k, k);
            if (count % k != 0) {
                runs.push(new long[] {value, count % k});
            }
        } else {
            runs.push(new long[] {value, count});
        }
    }
}
