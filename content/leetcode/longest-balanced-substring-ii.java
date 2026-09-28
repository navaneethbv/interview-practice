class Solution {
    public int longestBalanced(String s) {
        int answer = longestRun(s);
        answer = Math.max(answer, longestThreeLetters(s));
        for (char first = 'a'; first <= 'c'; first++) {
            for (char second = (char) (first + 1); second <= 'c'; second++) {
                answer = Math.max(answer, longestTwoLetters(s, first, second));
            }
        }
        return answer;
    }

    private int longestRun(String s) {
        int answer = 0;
        int run = 0;
        char previous = 0;
        for (char character : s.toCharArray()) {
            run = character == previous ? run + 1 : 1;
            previous = character;
            answer = Math.max(answer, run);
        }
        return answer;
    }

    private int longestTwoLetters(String s, char first, char second) {
        Map<Integer, Integer> firstPosition = new HashMap<>();
        firstPosition.put(0, -1);
        int answer = 0;
        int difference = 0;
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (character != first && character != second) {
                firstPosition.clear();
                firstPosition.put(0, index);
                difference = 0;
                continue;
            }
            difference += character == first ? 1 : -1;
            if (firstPosition.containsKey(difference)) {
                answer = Math.max(answer, index - firstPosition.get(difference));
            } else {
                firstPosition.put(difference, index);
            }
        }
        return answer;
    }

    private int longestThreeLetters(String s) {
        int[] counts = new int[3];
        Map<String, Integer> firstPosition = new HashMap<>();
        firstPosition.put("0,0", -1);
        int answer = 0;
        for (int index = 0; index < s.length(); index++) {
            counts[s.charAt(index) - 'a']++;
            String key = (counts[0] - counts[1]) + "," + (counts[0] - counts[2]);
            if (firstPosition.containsKey(key)) {
                answer = Math.max(answer, index - firstPosition.get(key));
            } else {
                firstPosition.put(key, index);
            }
        }
        return answer;
    }
}
