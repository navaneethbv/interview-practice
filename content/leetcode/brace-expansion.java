class Solution {
    public String[] expand(String s) {
        List<String[]> groups = parseGroups(s);
        List<String> result = new ArrayList<>();
        generate(groups, 0, new char[groups.size()], result);
        return result.toArray(new String[0]);
    }

    private List<String[]> parseGroups(String expression) {
        List<String[]> groups = new ArrayList<>();
        int index = 0;
        while (index < expression.length()) {
            if (expression.charAt(index) == '{') {
                int end = expression.indexOf('}', index);
                String[] choices = expression.substring(index + 1, end).split(",");
                Arrays.sort(choices);
                groups.add(choices);
                index = end + 1;
            } else {
                groups.add(new String[]{expression.substring(index, index + 1)});
                index++;
            }
        }
        return groups;
    }

    private void generate(List<String[]> groups, int groupIndex,
            char[] path, List<String> result) {
        if (groupIndex == groups.size()) {
            result.add(new String(path));
            return;
        }
        for (String choice : groups.get(groupIndex)) {
            path[groupIndex] = choice.charAt(0);
            generate(groups, groupIndex + 1, path, result);
        }
    }
}
