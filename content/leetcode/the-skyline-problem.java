class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        TreeMap<Integer, List<int[]>> events = new TreeMap<>();
        for (int[] building : buildings) {
            events.computeIfAbsent(building[0], key -> new ArrayList<>())
                    .add(new int[]{building[2], 1});
            events.computeIfAbsent(building[1], key -> new ArrayList<>())
                    .add(new int[]{building[2], -1});
        }

        TreeMap<Integer, Integer> activeHeights = new TreeMap<>();
        activeHeights.put(0, 1);
        List<List<Integer>> skyline = new ArrayList<>();
        int previousHeight = 0;

        for (Map.Entry<Integer, List<int[]>> event : events.entrySet()) {
            for (int[] change : event.getValue()) {
                int count = activeHeights.getOrDefault(change[0], 0) + change[1];
                if (count == 0) {
                    activeHeights.remove(change[0]);
                } else {
                    activeHeights.put(change[0], count);
                }
            }

            int currentHeight = activeHeights.lastKey();
            if (currentHeight != previousHeight) {
                skyline.add(Arrays.asList(event.getKey(), currentHeight));
                previousHeight = currentHeight;
            }
        }

        return skyline;
    }
}
