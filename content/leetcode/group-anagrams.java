class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String word : strs) {
            int[] counts = new int[26];
            for (int index = 0; index < word.length(); index++) {
                counts[word.charAt(index) - 'a']++;
            }
            String signature = Arrays.toString(counts);
            groups.computeIfAbsent(signature, key -> new ArrayList<>()).add(word);
        }
        return new ArrayList<>(groups.values());
    }
}
