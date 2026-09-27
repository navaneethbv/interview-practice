class Solution {
    private int position;

    public String countOfAtoms(String formula) {
        position = 0;
        Map<String, Integer> counts = parse(formula);
        StringBuilder result = new StringBuilder();
        for (String atom : new TreeSet<>(counts.keySet())) {
            result.append(atom);
            if (counts.get(atom) > 1) {
                result.append(counts.get(atom));
            }
        }
        return result.toString();
    }

    private Map<String, Integer> parse(String formula) {
        Map<String, Integer> counts = new HashMap<>();
        while (position < formula.length() && formula.charAt(position) != ')') {
            if (formula.charAt(position) == '(') {
                position++;
                Map<String, Integer> group = parse(formula);
                position++;
                int multiplier = number(formula);
                mergeGroup(counts, group, multiplier);
            } else {
                String atom = readAtom(formula);
                counts.merge(atom, number(formula), Integer::sum);
            }
        }
        return counts;
    }

    private void mergeGroup(Map<String, Integer> counts, Map<String, Integer> group,
            int multiplier) {
        for (Map.Entry<String, Integer> entry : group.entrySet()) {
            counts.merge(entry.getKey(), entry.getValue() * multiplier, Integer::sum);
        }
    }

    private String readAtom(String formula) {
        int start = position++;
        while (position < formula.length() && Character.isLowerCase(formula.charAt(position))) {
            position++;
        }
        return formula.substring(start, position);
    }

    private int number(String formula) {
        int start = position;
        int value = 0;
        while (position < formula.length() && Character.isDigit(formula.charAt(position))) {
            value = value * 10 + formula.charAt(position) - '0';
            position++;
        }
        return position == start ? 1 : value;
    }
}
