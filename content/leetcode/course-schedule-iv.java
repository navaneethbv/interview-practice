class Solution {
public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
    boolean[][] reachable = new boolean[numCourses][numCourses];
    for (int[] prerequisite : prerequisites) {
        reachable[prerequisite[0]][prerequisite[1]] = true;
    }
    for (int middle = 0; middle < numCourses; middle++) {
        for (int source = 0; source < numCourses; source++) {
            if (!reachable[source][middle]) {
                continue;
            }
            for (int destination = 0; destination < numCourses; destination++) {
                reachable[source][destination] |= reachable[middle][destination];
            }
        }
    }
    List<Boolean> result = new ArrayList<>();
    for (int[] query : queries) {
        result.add(reachable[query[0]][query[1]]);
    }
    return result;
}
}
