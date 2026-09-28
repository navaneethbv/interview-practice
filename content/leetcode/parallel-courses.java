class Solution {
    public int minimumSemesters(int n, int[][] relations) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int course = 0; course <= n; course++) {
            graph.add(new ArrayList<>());
        }
        int[] prerequisites = new int[n + 1];
        for (int[] relation : relations) {
            graph.get(relation[0]).add(relation[1]);
            prerequisites[relation[1]]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int course = 1; course <= n; course++) {
            if (prerequisites[course] == 0) {
                queue.add(course);
            }
        }

        int semesters = 0;
        int completed = 0;
        while (!queue.isEmpty()) {
            semesters++;
            completed += completeSemester(queue, graph, prerequisites);
        }
        return completed == n ? semesters : -1;
    }

    private int completeSemester(Deque<Integer> queue, List<List<Integer>> graph,
            int[] prerequisites) {
        int coursesThisSemester = queue.size();
        int completed = 0;
        for (int count = 0; count < coursesThisSemester; count++) {
            int course = queue.remove();
            completed++;
            unlockNextCourses(queue, graph.get(course), prerequisites);
        }
        return completed;
    }

    private void unlockNextCourses(Deque<Integer> queue, List<Integer> nextCourses,
            int[] prerequisites) {
        for (int nextCourse : nextCourses) {
            prerequisites[nextCourse]--;
            if (prerequisites[nextCourse] == 0) {
                queue.add(nextCourse);
            }
        }
    }
}
