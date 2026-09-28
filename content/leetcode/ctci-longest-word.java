class Solution {
    private final Set<String> known = new HashSet<>();
    private final Map<String, Boolean> memo = new HashMap<>();

    public String longestWord(String[] words) {
        known.addAll(Arrays.asList(words));
        String[] ordered = words.clone();
        Arrays.sort(ordered, (x, y) -> x.length() != y.length() ? y.length() - x.length() : x.compareTo(y));
        for (String word : ordered) {
            if (splits(word)) {
                return word;
            }
        }
        return "";
    }

    private boolean splits(String word) {
        for (int cut = 1; cut < word.length(); cut++) {
            String prefix = word.substring(0, cut);
            String suffix = word.substring(cut);
            if (known.contains(prefix) && (known.contains(suffix) || buildable(suffix))) {
                return true;
            }
        }
        return false;
    }

    private boolean buildable(String word) {
        Boolean cached = memo.get(word);
        if (cached != null) {
            return cached;
        }
        boolean result = splits(word);
        memo.put(word, result);
        return result;
    }
}
