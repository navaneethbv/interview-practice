class Solution {
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        List<List<Integer>> paths = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        path.add(0);
        visit(graph, path, paths);
        return paths;
    }

    private void visit(int[][] graph, List<Integer> path, List<List<Integer>> paths) {
        int node = path.get(path.size() - 1);
        if (node == graph.length - 1) {
            paths.add(new ArrayList<>(path));
            return;
        }
        for (int child : graph[node]) {
            path.add(child);
            visit(graph, path, paths);
            path.remove(path.size() - 1);
        }
    }
}
