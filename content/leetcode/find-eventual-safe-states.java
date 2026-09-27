class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        List<List<Integer>> reverseEdges = new ArrayList<>();
        int[] remaining = new int[graph.length];
        for (int node = 0; node < graph.length; node++) {
            reverseEdges.add(new ArrayList<>());
            remaining[node] = graph[node].length;
        }
        for (int node = 0; node < graph.length; node++) {
            for (int neighbor : graph[node]) {
                reverseEdges.get(neighbor).add(node);
            }
        }
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int node = 0; node < graph.length; node++) {
            if (remaining[node] == 0) {
                queue.add(node);
            }
        }
        List<Integer> safeNodes = new ArrayList<>();
        while (!queue.isEmpty()) {
            int node = queue.remove();
            safeNodes.add(node);
            for (int predecessor : reverseEdges.get(node)) {
                remaining[predecessor]--;
                if (remaining[predecessor] == 0) {
                    queue.add(predecessor);
                }
            }
        }
        Collections.sort(safeNodes);
        return safeNodes;
    }
}
