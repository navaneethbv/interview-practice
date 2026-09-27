class Solution {
    public double[] calcEquation(
            List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Map<String, Double>> graph = new HashMap<>();
        for (int index = 0; index < values.length; index++) {
            String first = equations.get(index).get(0);
            String second = equations.get(index).get(1);
            graph.computeIfAbsent(first, key -> new HashMap<>()).put(second, values[index]);
            graph.computeIfAbsent(second, key -> new HashMap<>()).put(first, 1 / values[index]);
        }

        double[] answers = new double[queries.size()];
        for (int index = 0; index < queries.size(); index++) {
            String start = queries.get(index).get(0);
            String end = queries.get(index).get(1);
            answers[index] = evaluate(start, end, graph, new HashSet<>());
        }
        return answers;
    }

    private double evaluate(
            String current,
            String target,
            Map<String, Map<String, Double>> graph,
            Set<String> seen) {
        if (!graph.containsKey(current) || !graph.containsKey(target)) {
            return -1.0;
        }
        if (current.equals(target)) {
            return 1.0;
        }

        seen.add(current);
        for (Map.Entry<String, Double> edge : graph.get(current).entrySet()) {
            if (!seen.contains(edge.getKey())) {
                double suffix = evaluate(edge.getKey(), target, graph, seen);
                if (suffix >= 0) {
                    return edge.getValue() * suffix;
                }
            }
        }
        return -1.0;
    }
}
