class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> visited = new HashSet<>(Arrays.asList(deadends));
        if (visited.contains("0000")) {
            return -1;
        }
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.add("0000");
        visited.add("0000");
        int turns = 0;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int index = 0; index < levelSize; index++) {
                String state = queue.remove();
                if (state.equals(target)) {
                    return turns;
                }
                addNeighbors(state, queue, visited);
            }
            turns++;
        }
        return -1;
    }

    private void addNeighbors(String state, ArrayDeque<String> queue, Set<String> visited) {
        for (int wheel = 0; wheel < 4; wheel++) {
            for (int delta : new int[]{-1, 1}) {
                char[] next = state.toCharArray();
                int digit = (next[wheel] - '0' + delta + 10) % 10;
                next[wheel] = (char) ('0' + digit);
                String nextState = new String(next);
                if (visited.add(nextState)) {
                    queue.add(nextState);
                }
            }
        }
    }
}
