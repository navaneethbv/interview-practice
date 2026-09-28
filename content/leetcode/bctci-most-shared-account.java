class Solution {
    public String mostSharedAccount(List<List<String>> connections) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (List<String> connection : connections) {
            counts.merge(connection.get(1), 1, Integer::sum);
        }
        String best = "";
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if (best.isEmpty() || entry.getValue() > counts.get(best)) {
                best = entry.getKey();
            }
        }
        return best;
    }
}
