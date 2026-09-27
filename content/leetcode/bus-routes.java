class Solution {
    public int numBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) {
            return 0;
        }
        Map<Integer, List<Integer>> busesAtStop = buildStopIndex(routes);
        Deque<int[]> pending = new ArrayDeque<>();
        pending.add(new int[] {source, 0});
        Set<Integer> seenStops = new HashSet<>();
        seenStops.add(source);
        boolean[] usedBuses = new boolean[routes.length];
        while (!pending.isEmpty()) {
            int[] state = pending.remove();
            for (int busIndex : busesAtStop.getOrDefault(state[0], Collections.emptyList())) {
                if (usedBuses[busIndex]) {
                    continue;
                }
                usedBuses[busIndex] = true;
                for (int stop : routes[busIndex]) {
                    if (stop == target) {
                        return state[1] + 1;
                    }
                    if (seenStops.add(stop)) {
                        pending.add(new int[] {stop, state[1] + 1});
                    }
                }
            }
        }
        return -1;
    }

    private Map<Integer, List<Integer>> buildStopIndex(int[][] routes) {
        Map<Integer, List<Integer>> busesAtStop = new HashMap<>();
        for (int busIndex = 0; busIndex < routes.length; busIndex++) {
            for (int stop : routes[busIndex]) {
                busesAtStop.computeIfAbsent(stop, ignored -> new ArrayList<>()).add(busIndex);
            }
        }
        return busesAtStop;
    }
}
