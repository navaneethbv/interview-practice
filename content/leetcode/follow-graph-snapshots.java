class FollowGraph {
    private final Map<Integer, Set<Integer>> live = new HashMap<>();
    private final List<Map<Integer, Set<Integer>>> snapshots = new ArrayList<>();

    public FollowGraph() {}

    public void follow(int user, int target) {
        if (user != target) {
            live.computeIfAbsent(user, ignored -> new HashSet<>()).add(target);
        }
    }

    public void unfollow(int user, int target) {
        if (live.containsKey(user)) {
            live.get(user).remove(target);
        }
    }

    public int snapshot() {
        Map<Integer, Set<Integer>> copy = new HashMap<>();
        for (Map.Entry<Integer, Set<Integer>> entry : live.entrySet()) {
            copy.put(entry.getKey(), new HashSet<>(entry.getValue()));
        }
        snapshots.add(copy);
        return snapshots.size() - 1;
    }

    public int[] following(int user, int snapshotId) {
        Map<Integer, Set<Integer>> graph = snapshotId == -1 ? live : snapshots.get(snapshotId);
        return graph.getOrDefault(user, Collections.emptySet()).stream()
            .mapToInt(Integer::intValue).sorted().toArray();
    }

    public int[] recommend(int user) {
        Set<Integer> direct = live.getOrDefault(user, Collections.emptySet());
        Set<Integer> candidates = new TreeSet<>();
        for (int friend : direct) {
            candidates.addAll(live.getOrDefault(friend, Collections.emptySet()));
        }
        candidates.removeAll(direct);
        candidates.remove(user);
        return candidates.stream().mapToInt(Integer::intValue).toArray();
    }
}
