class Solution {
    public int earliestAcq(int[][] logs, int n) {
        Arrays.sort(logs, Comparator.comparingInt(log -> log[0]));
        int[] parent = new int[n];
        for (int person = 0; person < n; person++) {
            parent[person] = person;
        }
        int components = n;
        for (int[] log : logs) {
            int firstRoot = find(parent, log[1]);
            int secondRoot = find(parent, log[2]);
            if (firstRoot != secondRoot) {
                parent[secondRoot] = firstRoot;
                components--;
                if (components == 1) {
                    return log[0];
                }
            }
        }
        return -1;
    }

    private int find(int[] parent, int person) {
        while (person != parent[person]) {
            parent[person] = parent[parent[person]];
            person = parent[person];
        }
        return person;
    }
}
