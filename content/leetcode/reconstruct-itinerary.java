class Solution {
    public List<String> findItinerary(List<List<String>> tickets) {
        Map<String, PriorityQueue<String>> graph = new HashMap<>();
        for (List<String> ticket : tickets) {
            graph.computeIfAbsent(ticket.get(0), ignored -> new PriorityQueue<>())
                    .add(ticket.get(1));
        }

        Deque<String> stack = new ArrayDeque<>();
        LinkedList<String> route = new LinkedList<>();
        stack.push("JFK");

        while (!stack.isEmpty()) {
            String airport = stack.peek();
            PriorityQueue<String> destinations = graph.get(airport);
            if (destinations != null && !destinations.isEmpty()) {
                stack.push(destinations.remove());
            } else {
                route.addFirst(stack.pop());
            }
        }

        return route;
    }
}
