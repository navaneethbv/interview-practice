class Solution {
    public boolean isIsomorphic(String s, String t) {
        Map<Character, Character> sourceToTarget = new HashMap<>();
        Map<Character, Character> targetToSource = new HashMap<>();
        for (int index = 0; index < s.length(); index++) {
            char source = s.charAt(index);
            char target = t.charAt(index);
            if (sourceToTarget.containsKey(source) && sourceToTarget.get(source) != target) {
                return false;
            }
            if (targetToSource.containsKey(target) && targetToSource.get(target) != source) {
                return false;
            }
            sourceToTarget.put(source, target);
            targetToSource.put(target, source);
        }
        return true;
    }
}
