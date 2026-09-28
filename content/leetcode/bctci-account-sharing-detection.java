class Solution {
    public String sharedAccountIp(List<List<String>> connections) {
        Map<String, Integer> counts = new HashMap<>();
        for (List<String> connection : connections) {
            counts.merge(connection.get(1), 1, Integer::sum);
        }
        for (List<String> connection : connections) {
            if (counts.get(connection.get(1)) > 1) {
                return connection.get(0);
            }
        }
        return "";
    }
}
