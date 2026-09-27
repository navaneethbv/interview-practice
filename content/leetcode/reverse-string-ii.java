class Solution {
    public String reverseStr(String s, int k) {
        char[] characters = s.toCharArray();

        for (int start = 0; start < characters.length; start += 2 * k) {
            int left = start;
            int right = Math.min(start + k - 1, characters.length - 1);
            while (left < right) {
                char temporary = characters[left];
                characters[left] = characters[right];
                characters[right] = temporary;
                left++;
                right--;
            }
        }
        return new String(characters);
    }
}
