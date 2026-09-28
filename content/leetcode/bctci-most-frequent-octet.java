class Solution {
    public String mostFrequentOctet(String[] ips) {
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (String ip : ips) {
            counts.merge(ip.substring(0, ip.indexOf('.')), 1, Integer::sum);
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
