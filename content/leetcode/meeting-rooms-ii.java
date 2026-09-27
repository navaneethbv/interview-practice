class Solution {
    public int minMeetingRooms(int[][] intervals) {
        Arrays.sort(intervals,Comparator.comparingInt(x->x[0]));PriorityQueue<Integer> ends=new PriorityQueue<>();int best=0;
        for(int[] x:intervals) {while(!ends.isEmpty()&&ends.peek()<=x[0]) ends.remove();ends.add(x[1]);best=Math.max(best,ends.size());}
        return best;
    }
}
