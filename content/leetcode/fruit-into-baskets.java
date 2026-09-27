class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> counts = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < fruits.length; right++) {
            counts.put(fruits[right], counts.getOrDefault(fruits[right], 0) + 1);
            while (counts.size() > 2) {
                int leaving = fruits[left++];
                int remaining = counts.get(leaving) - 1;
                if (remaining == 0) {
                    counts.remove(leaving);
                } else {
                    counts.put(leaving, remaining);
                }
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
