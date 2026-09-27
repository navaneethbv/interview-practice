class Solution {
private int find(int[] parent, int node) {
    while (parent[node] != node) {
        parent[node] = parent[parent[node]];
        node = parent[node];
    }
    return node;
}

private boolean join(int[] parent, int first, int second) {
    int firstRoot = find(parent, first);
    int secondRoot = find(parent, second);
    if (firstRoot == secondRoot) {
        return false;
    }
    parent[firstRoot] = secondRoot;
    return true;
}

private int processSharedEdge(
    int[] edge,
    int[] aliceParent,
    int[] bobParent,
    int[] successfulUnions
) {
    boolean joinsAlice = join(aliceParent, edge[1], edge[2]);
    boolean joinsBob = join(bobParent, edge[1], edge[2]);
    if (joinsAlice) {
        successfulUnions[0]++;
    }
    if (joinsBob) {
        successfulUnions[1]++;
    }
    return joinsAlice || joinsBob ? 1 : 0;
}

private int processExclusiveEdge(
    int[] edge,
    int[] parent,
    int[] successfulUnions,
    int travelerIndex
) {
    if (!join(parent, edge[1], edge[2])) {
        return 0;
    }
    successfulUnions[travelerIndex]++;
    return 1;
}

public int maxNumEdgesToRemove(int n, int[][] edges) {
    int[] aliceParent = new int[n + 1];
    int[] bobParent = new int[n + 1];
    for (int node = 1; node <= n; node++) {
        aliceParent[node] = node;
        bobParent[node] = node;
    }
    Arrays.sort(edges, (first, second) -> Integer.compare(second[0], first[0]));
    int usedEdges = 0;
    int[] successfulUnions = new int[2];
    for (int[] edge : edges) {
        if (edge[0] == 3) {
            usedEdges += processSharedEdge(edge, aliceParent, bobParent, successfulUnions);
        } else if (edge[0] == 1) {
            usedEdges += processExclusiveEdge(edge, aliceParent, successfulUnions, 0);
        } else {
            usedEdges += processExclusiveEdge(edge, bobParent, successfulUnions, 1);
        }
    }
    if (successfulUnions[0] != n - 1 || successfulUnions[1] != n - 1) {
        return -1;
    }
    return edges.length - usedEdges;
}
}
