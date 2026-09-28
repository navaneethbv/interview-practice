class Solution {
    public List<String> removeAnagrams(String[] words) {
        List<String> result = new ArrayList<>();
        String previousSignature = null;
        for (String word : words) {
            char[] letters = word.toCharArray();
            Arrays.sort(letters);
            String signature = new String(letters);
            if (!signature.equals(previousSignature)) {
                result.add(word);
                previousSignature = signature;
            }
        }
        return result;
    }
}
