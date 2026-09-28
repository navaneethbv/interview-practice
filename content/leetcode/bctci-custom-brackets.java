class Solution {
    public boolean isBalanced(String s, String[] brackets) {
        Map<Character, Character> closerOf = new HashMap<>();
        Set<Character> closers = new HashSet<>();
        for (String pair : brackets) {
            closerOf.put(pair.charAt(0), pair.charAt(1));
            closers.add(pair.charAt(1));
        }
        Deque<Character> expected = new ArrayDeque<>();
        for (char character : s.toCharArray()) {
            if (closerOf.containsKey(character)) {
                expected.push(closerOf.get(character));
            } else if (closers.contains(character)) {
                if (expected.isEmpty() || expected.pop() != character) {
                    return false;
                }
            }
        }
        return expected.isEmpty();
    }
}
