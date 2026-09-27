class Solution {
private void addUserPatterns(List<String> sites, Map<String, Integer> counts) {
    Set<String> patterns = new HashSet<>();
    for (int first = 0; first < sites.size(); first++) {
        for (int second = first + 1; second < sites.size(); second++) {
            for (int third = second + 1; third < sites.size(); third++) {
                patterns.add(sites.get(first) + " " + sites.get(second) + " " + sites.get(third));
            }
        }
    }
    for (String pattern : patterns) {
        counts.merge(pattern, 1, Integer::sum);
    }
}

public List<String> mostVisitedPattern(String[] username,int[] timestamp,String[] website) {
    Integer[] order = new Integer[username.length];
    for (int index = 0; index < order.length; index++) {
        order[index] = index;
    }
    Arrays.sort(order, Comparator.comparingInt(index -> timestamp[index]));
    Map<String, List<String>> visits = new HashMap<>();
    for (int index : order) {
        visits.computeIfAbsent(username[index], key -> new ArrayList<>()).add(website[index]);
    }
    Map<String, Integer> counts = new TreeMap<>();
    for (List<String> sites : visits.values()) {
        addUserPatterns(sites, counts);
    }
    String bestPattern = "";
    int bestScore = 0;
    for (Map.Entry<String, Integer> entry : counts.entrySet()) {
        if (entry.getValue() > bestScore) {
            bestScore = entry.getValue();
            bestPattern = entry.getKey();
        }
    }
    return Arrays.asList(bestPattern.split(" "));
}
}
