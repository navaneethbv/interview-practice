class Solution {
    public long[] distance(int[] nums){
        int n=nums.length;
        long[] a=new long[n];
        for (int pass=0;pass<2;pass++){
            Map<Integer,long[]> m=new HashMap<>();
            for (int t=0;t<n;t++){
                int i=pass==0?t:n-1-t;
                long[] p=m.computeIfAbsent(nums[i],k->new long[2]);
                a[i]+=Math.abs(p[0]*i-p[1]);
                p[0]++;
                p[1]+=i;
            }
        }
        return a;
    }
}
