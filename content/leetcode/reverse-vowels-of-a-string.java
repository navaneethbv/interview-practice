class Solution {
    public String reverseVowels(String s) {
        char[] characters = s.toCharArray();
        String vowels = "aeiouAEIOU";
        int left = 0;
        int right = characters.length - 1;

        while (left < right) {
            if (vowels.indexOf(characters[left]) < 0) {
                left++;
            } else if (vowels.indexOf(characters[right]) < 0) {
                right--;
            } else {
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
