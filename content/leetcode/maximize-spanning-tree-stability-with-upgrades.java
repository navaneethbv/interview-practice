class Solution {
    private int[] parent;
    private int[] componentSize;

    private int find(int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }

    private boolean join(int first, int second) {
        int firstRoot = find(first);
        int secondRoot = find(second);
        if (firstRoot == secondRoot) {
            return false;
        }
        if (componentSize[firstRoot] > componentSize[secondRoot]) {
            int temporary = firstRoot;
            firstRoot = secondRoot;
            secondRoot = temporary;
        }
        parent[firstRoot] = secondRoot;
        componentSize[secondRoot] += componentSize[firstRoot];
        return true;
    }

    private int joinMandatory(int[][] edges, int bound) {
        int joined = 0;
        for (int[] edge : edges) {
            if (edge[3] == 1) {
                if (edge[2] < bound || !join(edge[0], edge[1])) {
                    return -1;
                }
                joined++;
            }
        }
        return joined;
    }

    private int joinStrong(int[][] edges, int bound) {
        int joined = 0;
        for (int[] edge : edges) {
            if (edge[3] == 0 && edge[2] >= bound && join(edge[0], edge[1])) {
                joined++;
            }
        }
        return joined;
    }

    private int joinUpgradable(int[][] edges, int bound) {
        int upgrades = 0;
        for (int[] edge : edges) {
            if (edge[3] == 0 && edge[2] < bound && 2 * edge[2] >= bound
                    && join(edge[0], edge[1])) {
                upgrades++;
            }
        }
        return upgrades;
    }

    private boolean possible(int n, int[][] edges, int k, int bound) {
        parent = new int[n];
        componentSize = new int[n];
        for (int node = 0; node < n; node++) {
            parent[node] = node;
            componentSize[node] = 1;
        }
        int mandatory = joinMandatory(edges, bound);
        if (mandatory < 0) {
            return false;
        }
        int strong = joinStrong(edges, bound);
        int upgrades = joinUpgradable(edges, bound);
        int components = n - mandatory - strong - upgrades;
        return components == 1 && upgrades <= k;
    }

    public int maxStability(int n, int[][] edges, int k) {
        if (!possible(n, edges, k, 0)) {
            return -1;
        }
        int low = 0;
        int high = 200000;
        while (low < high) {
            int middle = (low + high + 1) / 2;
            if (possible(n, edges, k, middle)) {
                low = middle;
            } else {
                high = middle - 1;
            }
        }
        return low;
    }
}
