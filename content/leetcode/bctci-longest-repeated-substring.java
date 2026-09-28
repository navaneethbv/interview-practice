class Solution {
    public String longestRepeated(String s) {
        int low = 1;
        int high = s.length() - 1;
        String best = "";
        while (low <= high) {
            int length = (low + high) >>> 1;
            String found = repeat(s, length);
            if (found != null) {
                best = found;
                low = length + 1;
            } else {
                high = length - 1;
            }
        }
        return best;
    }

    private String repeat(String s, int length) {
        Map<String, Integer> seen = new HashMap<>();
        int bestStart = -1;
        for (int start = 0; start + length <= s.length(); start++) {
            String window = s.substring(start, start + length);
            Integer first = seen.putIfAbsent(window, start);
            if (first != null && (bestStart == -1 || first < bestStart)) {
                bestStart = first;
            }
        }
        return bestStart == -1 ? null : s.substring(bestStart, bestStart + length);
    }
}
