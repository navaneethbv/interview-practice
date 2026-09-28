class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>();
        Set<String> repeated = new HashSet<>();
        for (int start = 0; start + 10 <= s.length(); start++) {
            String sequence = s.substring(start, start + 10);
            if (!seen.add(sequence)) {
                repeated.add(sequence);
            }
        }
        return new ArrayList<>(repeated);
    }
}
