class Solution {
    public int maxLength(List<String> arr) {
        Set<Integer> masks = new HashSet<>();
        masks.add(0);
        for (String word : arr) {
            int wordMask = wordMask(word);
            if (wordMask == -1) {
                continue;
            }
            Set<Integer> additions = new HashSet<>();
            for (int previous : masks) {
                if ((previous & wordMask) == 0) {
                    additions.add(previous | wordMask);
                }
            }
            masks.addAll(additions);
        }
        int longest = 0;
        for (int mask : masks) {
            longest = Math.max(longest, Integer.bitCount(mask));
        }
        return longest;
    }

    private int wordMask(String word) {
        int mask = 0;
        for (int index = 0; index < word.length(); index++) {
            int bit = 1 << (word.charAt(index) - 'a');
            if ((mask & bit) != 0) {
                return -1;
            }
            mask |= bit;
        }
        return mask;
    }
}
