class Solution {
    private static final class Node {
        final Map<Character, Node> children = new HashMap<>();
        final List<Integer> ends = new ArrayList<>();
    }

    public List<List<Integer>> multiSearch(String big, String[] smalls) {
        Node root = new Node();
        for (int index = 0; index < smalls.length; index++) {
            Node node = root;
            for (char letter : smalls[index].toCharArray()) {
                node = node.children.computeIfAbsent(letter, key -> new Node());
            }
            node.ends.add(index);
        }
        List<List<Integer>> positions = new ArrayList<>();
        for (int index = 0; index < smalls.length; index++) {
            positions.add(new ArrayList<>());
        }
        for (int start = 0; start < big.length(); start++) {
            Node node = root;
            for (int i = start; i < big.length(); i++) {
                node = node.children.get(big.charAt(i));
                if (node == null) {
                    break;
                }
                for (int index : node.ends) {
                    positions.get(index).add(start);
                }
            }
        }
        return positions;
    }
}
