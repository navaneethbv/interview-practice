class Solution {
    public int minimumTime(int n, int[][] relations, int[] time) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int course = 0; course < n; course++) {
            graph.add(new ArrayList<>());
        }
        int[] degree = new int[n];
        int[] finish = time.clone();
        for (int[] relation : relations) {
            int prerequisite = relation[0] - 1;
            int course = relation[1] - 1;
            graph.get(prerequisite).add(course);
            degree[course]++;
        }
        Deque<Integer> ready = new ArrayDeque<>();
        for (int course = 0; course < n; course++) {
            if (degree[course] == 0) {
                ready.add(course);
            }
        }
        int answer = 0;
        while (!ready.isEmpty()) {
            int course = ready.remove();
            answer = Math.max(answer, finish[course]);
            for (int nextCourse : graph.get(course)) {
                finish[nextCourse] = Math.max(finish[nextCourse], finish[course] + time[nextCourse]);
                degree[nextCourse]--;
                if (degree[nextCourse] == 0) {
                    ready.add(nextCourse);
                }
            }
        }
        return answer;
    }
}
