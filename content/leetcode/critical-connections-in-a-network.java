class Solution {
    private void finishNode(
        int node,
        int[] discovery,
        int[] low,
        int[] parent,
        List<List<Integer>> result
    ) {
        int parentNode = parent[node];
        if (parentNode == -1) {
            return;
        }
        if (low[node] > discovery[parentNode]) {
            result.add(Arrays.asList(parentNode, node));
        }
        low[parentNode] = Math.min(low[parentNode], low[node]);
    }

    private void visitNeighbor(
        int node,
        int child,
        List<List<Integer>> adjacency,
        int[] discovery,
        int[] low,
        int[] parent,
        Deque<Integer> stack,
        int[] timer
    ) {
        if (child == parent[node]) {
            return;
        }
        if (discovery[child] == -1) {
            parent[child] = node;
            discovery[child] = timer[0];
            low[child] = timer[0];
            timer[0]++;
            stack.push(child);
            return;
        }
        low[node] = Math.min(low[node], discovery[child]);
    }

    public List<List<Integer>> criticalConnections(int n,List<List<Integer>> connections) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            adjacency.add(new ArrayList<>());
        }
        for (List<Integer> connection : connections) {
            adjacency.get(connection.get(0)).add(connection.get(1));
            adjacency.get(connection.get(1)).add(connection.get(0));
        }
        int[] discovery = new int[n];
        int[] low = new int[n];
        int[] parent = new int[n];
        int[] cursor = new int[n];
        Arrays.fill(discovery, -1);
        Arrays.fill(parent, -1);
        discovery[0] = 0;
        low[0] = 0;
        int[] timer = {1};
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        List<List<Integer>> result = new ArrayList<>();
        while (!stack.isEmpty()) {
            int node = stack.peek();
            if (cursor[node] == adjacency.get(node).size()) {
                stack.pop();
                finishNode(node, discovery, low, parent, result);
                continue;
            }
            int child = adjacency.get(node).get(cursor[node]++);
            visitNeighbor(node, child, adjacency, discovery, low, parent, stack, timer);
        }
        return result;
    }
}
