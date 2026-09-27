class Solution {
    public List<List<String>> groupStrings(String[] strings) {
        Map<String, List<String>> groups = new HashMap<>();
        for (String word : strings) {
            String signature = signatureOf(word);
            groups.computeIfAbsent(signature, key -> new ArrayList<>()).add(word);
        }
        return new ArrayList<>(groups.values());
    }

    private String signatureOf(String word) {
        StringBuilder signature = new StringBuilder();
        int firstCode = word.charAt(0);
        for (char character : word.toCharArray()) {
            int offset = (character - firstCode + 26) % 26;
            signature.append(offset).append(',');
        }
        return signature.toString();
    }
}
