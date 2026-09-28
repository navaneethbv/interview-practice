class Solution {
    public List<Integer> findAnomalies(String[] agents, String[] actions, int[] tickets) {
        Set<Integer> bad = new HashSet<>();
        Map<Integer, String> openedBy = new HashMap<>();
        Set<Integer> closed = new HashSet<>();
        Map<String, Integer> lastTicket = new HashMap<>();
        for (int i = 0; i < agents.length; i++) {
            String agent = agents[i];
            int ticket = tickets[i];
            Integer previous = lastTicket.put(agent, ticket);
            if (previous != null && previous != ticket && openedBy.containsKey(previous) && !closed.contains(previous)) {
                bad.add(previous);
            }
            if (actions[i].equals("open")) {
                if (openedBy.containsKey(ticket) || closed.contains(ticket)) {
                    bad.add(ticket);
                }
                openedBy.putIfAbsent(ticket, agent);
            } else {
                if (!openedBy.containsKey(ticket) || closed.contains(ticket) || !openedBy.get(ticket).equals(agent)) {
                    bad.add(ticket);
                }
                closed.add(ticket);
            }
        }
        for (int ticket : openedBy.keySet()) {
            if (!closed.contains(ticket)) {
                bad.add(ticket);
            }
        }
        return new ArrayList<>(bad);
    }
}
