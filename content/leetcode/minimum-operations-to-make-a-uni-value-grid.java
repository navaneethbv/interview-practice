class Solution {
public int minOperations(int[][] grid,int x){int[] a=new int[grid.length*grid[0].length];int p=0;for(int[] r:grid)for(int v:r)a[p++]=v;Arrays.sort(a);int ans=0;for(int v:a){if((v-a[0])%x!=0)return -1;ans+=Math.abs(v-a[a.length/2])/x;}return ans;}
}
