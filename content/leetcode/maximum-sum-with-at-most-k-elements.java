class Solution {
public long maxSum(int[][] grid,int[] limits,int k){List<Integer> a=new ArrayList<>();for(int i=0;i<grid.length;i++){Arrays.sort(grid[i]);for(int j=0;j<limits[i];j++)a.add(grid[i][grid[i].length-1-j]);}a.sort(Collections.reverseOrder());long ans=0;for(int i=0;i<k;i++)ans+=a.get(i);return ans;}
}
