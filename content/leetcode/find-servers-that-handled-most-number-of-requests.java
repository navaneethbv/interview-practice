class Solution {
    public List<Integer> busiestServers(int k, int[] arrival, int[] load) {
        TreeSet<Integer> available = new TreeSet<>();
        for (int server = 0; server < k; server++) {
            available.add(server);
        }
        PriorityQueue<long[]> busy = new PriorityQueue<>(Comparator.comparingLong(job -> job[0]));
        int[] counts = new int[k];
        for (int index = 0; index < arrival.length; index++) {
            releaseServers(busy, available, arrival[index]);
            if (available.isEmpty()) {
                continue;
            }
            Integer server = available.ceiling(index % k);
            if (server == null) {
                server = available.first();
            }
            available.remove(server);
            counts[server]++;
            busy.add(new long[]{(long) arrival[index] + load[index], server});
        }
        return busiest(counts);
    }

    private void releaseServers(PriorityQueue<long[]> busy, TreeSet<Integer> available, int time) {
        while (!busy.isEmpty() && busy.peek()[0] <= time) {
            available.add((int) busy.remove()[1]);
        }
    }

    private List<Integer> busiest(int[] counts) {
        int best = 0;
        for (int count : counts) {
            best = Math.max(best, count);
        }
        List<Integer> result = new ArrayList<>();
        for (int server = 0; server < counts.length; server++) {
            if (counts[server] == best) {
                result.add(server);
            }
        }
        return result;
    }
}
