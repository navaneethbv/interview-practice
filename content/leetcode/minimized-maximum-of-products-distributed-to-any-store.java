class Solution {
    public int minimizedMaximum(int n,int[] quantities){
        int lo=1,hi=0;
        for (int x:quantities) {
            hi=Math.max(hi,x);
        }
        while (lo<hi){
            int m=lo+(hi-lo)/2;
            long need=0;
            for (int x:quantities) {
                need+=(x+m-1)/m;
            }
            if (need<=n) {
                hi=m;
            }
            else lo=m+1;
        }
        return lo;
    }
}
