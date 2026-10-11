class Solution {
    public List<String> convertToTrace(int[] timestamps, List<List<String>> stacks) {
        List<String> events = new ArrayList<>();
        List<String> previous = new ArrayList<>();
        for (int i = 0; i < timestamps.length; i++) {
            List<String> stack = stacks.get(i);
            int common = 0;
            while (common < Math.min(previous.size(), stack.size()) && previous.get(common).equals(stack.get(common))) {
                common++;
            }
            for (int d = previous.size() - 1; d >= common; d--) {
                events.add("E " + previous.get(d) + " " + timestamps[i]);
            }
            for (int d = common; d < stack.size(); d++) {
                events.add("B " + stack.get(d) + " " + timestamps[i]);
            }
            previous = stack;
        }
        int last = timestamps[timestamps.length - 1];
        for (int d = previous.size() - 1; d >= 0; d--) {
            events.add("E " + previous.get(d) + " " + last);
        }
        return events;
    }
}
