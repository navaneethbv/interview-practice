class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> edges = new ArrayList<>();
        for (int course = 0; course < numCourses; course++) {
            edges.add(new ArrayList<>());
        }
        int[] degree = new int[numCourses];
        for (int[] pair : prerequisites) {
            edges.get(pair[1]).add(pair[0]);
            degree[pair[0]]++;
        }
        Deque<Integer> queue = new ArrayDeque<>();
        for (int course = 0; course < numCourses; course++) {
            if (degree[course] == 0) {
                queue.addLast(course);
            }
        }
        return finishCourses(edges, degree, queue) == numCourses;
    }

    private int finishCourses(List<List<Integer>> edges, int[] degree, Deque<Integer> queue) {
        int completed = 0;
        while (!queue.isEmpty()) {
            int course = queue.removeFirst();
            completed++;
            for (int dependent : edges.get(course)) {
                degree[dependent]--;
                if (degree[dependent] == 0) {
                    queue.addLast(dependent);
                }
            }
        }
        return completed;
    }
}
