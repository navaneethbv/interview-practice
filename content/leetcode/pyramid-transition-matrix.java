class Solution {
    private boolean build(String row, Map<String, List<Character>> rules, Map<String, Boolean> memo) {
        if (row.length() == 1) {
            return true;
        }
        if (memo.containsKey(row)) {
            return memo.get(row);
        }
        boolean possible = extend(row, 0, new StringBuilder(), rules, memo);
        memo.put(row, possible);
        return possible;
    }

    private boolean extend(
        String row,
        int index,
        StringBuilder nextRow,
        Map<String, List<Character>> rules,
        Map<String, Boolean> memo
    ) {
        if (index == row.length() - 1) {
            return build(nextRow.toString(), rules, memo);
        }
        String pair = row.substring(index, index + 2);
        for (char character : rules.getOrDefault(pair, Collections.emptyList())) {
            nextRow.append(character);
            if (extend(row, index + 1, nextRow, rules, memo)) {
                return true;
            }
            nextRow.setLength(nextRow.length() - 1);
        }
        return false;
    }

    public boolean pyramidTransition(String bottom, List<String> allowed) {
        Map<String, List<Character>> rules = new HashMap<>();
        for (String triple : allowed) {
            rules.computeIfAbsent(triple.substring(0, 2), key -> new ArrayList<>())
                .add(triple.charAt(2));
        }
        return build(bottom, rules, new HashMap<>());
    }
}
