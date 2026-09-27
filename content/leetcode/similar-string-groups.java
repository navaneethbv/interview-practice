class Solution {
    public int numSimilarGroups(String[] strs) {
        int[] parent = new int[strs.length];
        int[] size = new int[strs.length];
        Arrays.fill(size, 1);
        for (int index = 0; index < parent.length; index++) parent[index] = index;
        for (int right = 0; right < strs.length; right++) {
            for (int left = 0; left < right; left++) {
                if (differenceCount(strs[left], strs[right]) <= 2) {
                    union(parent, size, right, left);
                }
            }
        }
        Set<Integer> roots = new HashSet<>();
        for (int index = 0; index < parent.length; index++) roots.add(find(parent, index));
        return roots.size();
    }

    private void union(int[] parent, int[] size, int first, int second) {
        int firstRoot = find(parent, first);
        int secondRoot = find(parent, second);
        if (firstRoot == secondRoot) {
            return;
        }
        if (size[firstRoot] < size[secondRoot]) {
            int temporary = firstRoot;
            firstRoot = secondRoot;
            secondRoot = temporary;
        }
        parent[secondRoot] = firstRoot;
        size[firstRoot] += size[secondRoot];
    }

    private int differenceCount(String first, String second) {
        int differences = 0;
        for (int index = 0; index < first.length(); index++) {
            if (first.charAt(index) != second.charAt(index)) differences++;
        }
        return differences;
    }

    private int find(int[] parent, int index) {
        while (parent[index] != index) {
            parent[index] = parent[parent[index]];
            index = parent[index];
        }
        return index;
    }
}
