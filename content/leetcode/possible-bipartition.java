class Solution {
    public boolean possibleBipartition(int n, int[][] dislikes) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int person = 0; person <= n; person++) {
            graph.add(new ArrayList<>());
        }
        for (int[] pair : dislikes) {
            graph.get(pair[0]).add(pair[1]);
            graph.get(pair[1]).add(pair[0]);
        }

        int[] colors = new int[n + 1];
        for (int start = 1; start <= n; start++) {
            if (colors[start] != 0) {
                continue;
            }
            if (!colorComponent(graph, start, colors)) {
                return false;
            }
        }
        return true;
    }

    private boolean colorComponent(List<List<Integer>> graph, int start, int[] colors) {
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        colors[start] = 1;
        while (!queue.isEmpty()) {
            int person = queue.remove();
            if (!assignNeighbors(graph, person, colors, queue)) {
                return false;
            }
        }
        return true;
    }

    private boolean assignNeighbors(List<List<Integer>> graph, int person, int[] colors,
            Deque<Integer> queue) {
        for (int neighbor : graph.get(person)) {
            if (colors[neighbor] == colors[person]) {
                return false;
            }
            if (colors[neighbor] == 0) {
                colors[neighbor] = -colors[person];
                queue.add(neighbor);
            }
        }
        return true;
    }
}
