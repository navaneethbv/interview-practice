class Solution {
public int furthestBuilding(int[] heights,int bricks,int ladders) {PriorityQueue<Integer> climbs=new PriorityQueue<>();for(int i=0;i+1<heights.length;i++) {int rise=heights[i+1]-heights[i];if(rise>0) {climbs.add(rise);if(climbs.size()>ladders) bricks-=climbs.remove();if(bricks<0) return i;}}return heights.length-1;}
}
