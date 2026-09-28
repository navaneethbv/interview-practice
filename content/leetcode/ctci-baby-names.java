class Solution {
    private final Map<String, String> parent = new HashMap<>();

    public List<String> trulyMostPopular(String[] names, int[] counts, List<List<String>> synonyms) {
        for (List<String> pair : synonyms) {
            String first = find(pair.get(0));
            String second = find(pair.get(1));
            if (!first.equals(second)) {
                if (first.compareTo(second) < 0) {
                    parent.put(second, first);
                } else {
                    parent.put(first, second);
                }
            }
        }
        Map<String, Integer> totals = new LinkedHashMap<>();
        for (int i = 0; i < names.length; i++) {
            totals.merge(find(names[i]), counts[i], Integer::sum);
        }
        List<String> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : totals.entrySet()) {
            result.add(entry.getKey() + ":" + entry.getValue());
        }
        return result;
    }

    private String find(String name) {
        parent.putIfAbsent(name, name);
        String root = name;
        while (!parent.get(root).equals(root)) {
            root = parent.get(root);
        }
        while (!parent.get(name).equals(root)) {
            String next = parent.get(name);
            parent.put(name, root);
            name = next;
        }
        return root;
    }
}
