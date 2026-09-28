class Solution {
    public String currentUrl(List<List<String>> actions) {
        Deque<String> history = new ArrayDeque<>();
        for (List<String> action : actions) {
            if (action.get(0).equals("go")) {
                history.push(action.get(1));
            } else {
                int steps = Integer.parseInt(action.get(1));
                while (steps-- > 0 && history.size() > 1) {
                    history.pop();
                }
            }
        }
        return history.peek();
    }
}
