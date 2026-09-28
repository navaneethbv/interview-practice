class Solution {
    public String[] findLongestSubarray(String[] array) {
        Map<Integer, Integer> firstSeen = new HashMap<>();
        firstSeen.put(0, -1);
        int balance = 0;
        int bestStart = 0;
        int bestLength = 0;
        for (int index = 0; index < array.length; index++) {
            balance += Character.isLetter(array[index].charAt(0)) ? 1 : -1;
            Integer first = firstSeen.putIfAbsent(balance, index);
            if (first != null && index - first > bestLength) {
                bestStart = first + 1;
                bestLength = index - first;
            }
        }
        return Arrays.copyOfRange(array, bestStart, bestStart + bestLength);
    }
}
