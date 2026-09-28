class Solution {
    public int minimumEffort(int[][] tasks){
        Arrays.sort(tasks,(a,b)->Integer.compare(b[1]-b[0],a[1]-a[0]));
        int energy=0,ans=0;
        for (int[] t:tasks){
            if (energy<t[1]){
                ans+=t[1]-energy;
                energy=t[1];
            }
            energy-=t[0];
        }
        return ans;
    }
}
