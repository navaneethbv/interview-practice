class Solution {
    public long compileTime(int[] seconds, int[][] imports) {
        int n = seconds.length;
        List<List<Integer>> dependents = new ArrayList<>();
        for (int package_ = 0; package_ < n; package_++) {
            dependents.add(new ArrayList<>());
        }
        int[] waiting = new int[n];
        for (int package_ = 0; package_ < n; package_++) {
            waiting[package_] = imports[package_].length;
            for (int dependency : imports[package_]) {
                dependents.get(dependency).add(package_);
            }
        }
        long[] start = new long[n];
        Deque<Integer> queue = new ArrayDeque<>();
        for (int package_ = 0; package_ < n; package_++) {
            if (waiting[package_] == 0) {
                queue.add(package_);
            }
        }
        long finish = 0;
        while (!queue.isEmpty()) {
            int package_ = queue.poll();
            long done = start[package_] + seconds[package_];
            finish = Math.max(finish, done);
            for (int dependent : dependents.get(package_)) {
                start[dependent] = Math.max(start[dependent], done);
                if (--waiting[dependent] == 0) {
                    queue.add(dependent);
                }
            }
        }
        return finish;
    }
}
