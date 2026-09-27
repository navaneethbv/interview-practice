class Solution {
public String removeDuplicates(String s, int k) {
    char[] characters = new char[s.length()];
    int[] runLengths = new int[s.length()];
    int stackSize = 0;
    for (char character : s.toCharArray()) {
        if (stackSize > 0 && characters[stackSize - 1] == character) {
            runLengths[stackSize - 1]++;
        } else {
            characters[stackSize] = character;
            runLengths[stackSize] = 1;
            stackSize++;
        }
        if (runLengths[stackSize - 1] == k) {
            stackSize--;
        }
    }
    StringBuilder result = new StringBuilder();
    for (int index = 0; index < stackSize; index++) {
        result.append(String.valueOf(characters[index]).repeat(runLengths[index]));
    }
    return result.toString();
}
}
