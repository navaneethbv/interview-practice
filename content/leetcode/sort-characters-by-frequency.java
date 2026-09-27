class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            counts.put(character, counts.getOrDefault(character, 0) + 1);
        }
        List<Character> characters = new ArrayList<>(counts.keySet());
        characters.sort((first, second) -> counts.get(second) - counts.get(first));
        StringBuilder result = new StringBuilder();
        for (char character : characters) {
            result.append(String.valueOf(character).repeat(counts.get(character)));
        }
        return result.toString();
    }
}
