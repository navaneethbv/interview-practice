class Solution {
    public List<List<Integer>> palindromePairs(String[] words) {
        Map<String, Integer> wordIndex = new HashMap<>();
        for (int index = 0; index < words.length; index++) {
            wordIndex.put(words[index], index);
        }
        Set<List<Integer>> pairs = new HashSet<>();
        for (int currentIndex = 0; currentIndex < words.length; currentIndex++) {
            String word = words[currentIndex];
            for (int split = 0; split <= word.length(); split++) {
                String left = word.substring(0, split);
                String right = word.substring(split);
                if (isPalindrome(left)) {
                    addPair(pairs, wordIndex.get(reverse(right)), currentIndex, true);
                }
                if (isPalindrome(right)) {
                    addPair(pairs, wordIndex.get(reverse(left)), currentIndex, false);
                }
            }
        }
        return new ArrayList<>(pairs);
    }

    private void addPair(Set<List<Integer>> pairs, Integer otherIndex,
                         int currentIndex, boolean otherFirst) {
        if (otherIndex == null || otherIndex == currentIndex) {
            return;
        }
        if (otherFirst) {
            pairs.add(Arrays.asList(otherIndex, currentIndex));
        } else {
            pairs.add(Arrays.asList(currentIndex, otherIndex));
        }
    }

    private String reverse(String value) {
        return new StringBuilder(value).reverse().toString();
    }

    private boolean isPalindrome(String value) {
        int left = 0;
        int right = value.length() - 1;
        while (left < right) {
            if (value.charAt(left++) != value.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
}
