class Solution {
    private static final class Node {
        final TreeMap<String, Node> children = new TreeMap<>();
        String key = "";
    }

    private final Map<String, Integer> counts = new HashMap<>();

    public List<List<String>> deleteDuplicateFolder(List<List<String>> paths) {
        Node root = new Node();
        for (List<String> path : paths) {
            Node node = root;
            for (String name : path) {
                node = node.children.computeIfAbsent(name, k -> new Node());
            }
        }
        sign(root);
        List<List<String>> result = new ArrayList<>();
        collect(root, new ArrayList<>(), result);
        return result;
    }

    private String sign(Node node) {
        StringBuilder key = new StringBuilder();
        for (Map.Entry<String, Node> entry : node.children.entrySet()) {
            key.append('(').append(entry.getKey()).append(sign(entry.getValue())).append(')');
        }
        node.key = key.toString();
        if (!node.key.isEmpty()) {
            counts.merge(node.key, 1, Integer::sum);
        }
        return node.key;
    }

    private void collect(Node node, List<String> path, List<List<String>> result) {
        for (Map.Entry<String, Node> entry : node.children.entrySet()) {
            Node child = entry.getValue();
            if (!child.key.isEmpty() && counts.get(child.key) > 1) {
                continue;
            }
            path.add(entry.getKey());
            result.add(new ArrayList<>(path));
            collect(child, path, result);
            path.remove(path.size() - 1);
        }
    }
}
