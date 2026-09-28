class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> climbs = new PriorityQueue<>();
        for (int index = 0; index + 1 < heights.length; index++) {
            int rise = heights[index + 1] - heights[index];
            if (rise <= 0) {
                continue;
            }
            climbs.add(rise);
            if (climbs.size() > ladders) {
                bricks -= climbs.remove();
            }
            if (bricks < 0) {
                return index;
            }
        }
        return heights.length - 1;
    }
}
