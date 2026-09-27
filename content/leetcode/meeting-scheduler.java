class Solution {
    public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {
        int[][] firstSlots = slots1.clone();
        int[][] secondSlots = slots2.clone();
        Arrays.sort(firstSlots, Comparator.comparingInt(slot -> slot[0]));
        Arrays.sort(secondSlots, Comparator.comparingInt(slot -> slot[0]));
        int first = 0;
        int second = 0;
        while (first < firstSlots.length && second < secondSlots.length) {
            int start = Math.max(firstSlots[first][0], secondSlots[second][0]);
            int end = Math.min(firstSlots[first][1], secondSlots[second][1]);
            if (end - start >= duration) {
                return Arrays.asList(start, start + duration);
            }
            if (firstSlots[first][1] < secondSlots[second][1]) {
                first++;
            } else {
                second++;
            }
        }
        return new ArrayList<>();
    }
}
