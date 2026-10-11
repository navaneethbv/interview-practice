class Solution {
    public List<List<String>> findDuplicate(String[] paths) {
        Map<String, List<String>> byContent = new HashMap<>();
        for (String entry : paths) {
            String[] parts = entry.split(" ");
            for (int i = 1; i < parts.length; i++) {
                int open = parts[i].indexOf('(');
                String content = parts[i].substring(open + 1, parts[i].length() - 1);
                byContent.computeIfAbsent(content, k -> new ArrayList<>()).add(parts[0] + "/" + parts[i].substring(0, open));
            }
        }
        List<List<String>> groups = new ArrayList<>();
        for (List<String> group : byContent.values()) {
            if (group.size() > 1) {
                groups.add(group);
            }
        }
        return groups;
    }
}
