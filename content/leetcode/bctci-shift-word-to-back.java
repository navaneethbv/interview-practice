class Solution {
    public void shiftWordToBack(char[] arr, String word) {
        int matched = 0;
        int write = 0;
        for (int read = 0; read < arr.length; read++) {
            if (matched < word.length() && arr[read] == word.charAt(matched)) {
                matched++;
            } else {
                arr[write++] = arr[read];
            }
        }
        for (int offset = 0; offset < word.length(); offset++) {
            arr[write + offset] = word.charAt(offset);
        }
    }
}
