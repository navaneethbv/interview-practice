class Solution {
    public List<String> letterCombinations(String digits) {
        String[] keyToLetters = {
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        };
        List<String> combinations = new ArrayList<>();
        if (digits.isEmpty()) {
            return combinations;
        }

        combinations.add("");
        for (char digit : digits.toCharArray()) {
            String letters = keyToLetters[digit - '0'];
            List<String> nextCombinations = new ArrayList<>();

            for (String prefix : combinations) {
                for (char letter : letters.toCharArray()) {
                    nextCombinations.add(prefix + letter);
                }
            }
            combinations = nextCombinations;
        }

        return combinations;
    }
}
