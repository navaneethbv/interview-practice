class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals,Comparator.comparingInt(x->x[1]));int kept=0,end=Integer.MIN_VALUE;
        for(int[] x:intervals) if(x[0]>=end) {end=x[1];kept++;}return intervals.length-kept;
    }
}
