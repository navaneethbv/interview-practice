class Solution {
    public List<Boolean> sameComponent(int[][] graph, int[][] queries) {
        int[] label = new int[graph.length];
        Arrays.fill(label, -1);
        for (int start = 0; start < graph.length; start++) {
            if (label[start] != -1) {
                continue;
            }
            label[start] = start;
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            while (!stack.isEmpty()) {
                for (int neighbor : graph[stack.pop()]) {
                    if (label[neighbor] == -1) {
                        label[neighbor] = start;
                        stack.push(neighbor);
                    }
                }
            }
        }
        List<Boolean> answers = new ArrayList<>();
        for (int[] query : queries) {
            answers.add(label[query[0]] == label[query[1]]);
        }
        return answers;
    }
}
