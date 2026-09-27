class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> following = new ArrayList<>();
        int[] indegree = new int[numCourses];

        for (int course = 0; course < numCourses; course++) {
            following.add(new ArrayList<>());
        }
        for (int[] prerequisite : prerequisites) {
            following.get(prerequisite[1]).add(prerequisite[0]);
            indegree[prerequisite[0]]++;
        }

        Deque<Integer> available = new ArrayDeque<>();
        for (int course = 0; course < numCourses; course++) {
            if (indegree[course] == 0) {
                available.add(course);
            }
        }

        int[] order = new int[numCourses];
        int orderSize = 0;
        while (!available.isEmpty()) {
            int course = available.remove();
            order[orderSize++] = course;
            for (int nextCourse : following.get(course)) {
                indegree[nextCourse]--;
                if (indegree[nextCourse] == 0) {
                    available.add(nextCourse);
                }
            }
        }

        return orderSize == numCourses ? order : new int[0];
    }
}
