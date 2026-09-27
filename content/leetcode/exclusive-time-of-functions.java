class Solution {
    public int[] exclusiveTime(int n, List<String> logs) {
        int[] durations = new int[n];
        Deque<Integer> callStack = new ArrayDeque<>();
        int previousTime = 0;

        for (String log : logs) {
            String[] parts = log.split(":");
            int functionId = Integer.parseInt(parts[0]);
            int timestamp = Integer.parseInt(parts[2]);

            if (parts[1].equals("start")) {
                if (!callStack.isEmpty()) {
                    durations[callStack.peek()] += timestamp - previousTime;
                }
                callStack.push(functionId);
                previousTime = timestamp;
            } else {
                durations[callStack.pop()] += timestamp - previousTime + 1;
                previousTime = timestamp + 1;
            }
        }

        return durations;
    }
}
