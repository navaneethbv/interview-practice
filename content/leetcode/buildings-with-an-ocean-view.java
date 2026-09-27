class Solution {
public int[] findBuildings(int[] heights){List<Integer>out=new ArrayList<>();int tall=0;for(int i=heights.length-1;i>=0;i--)if(heights[i]>tall){out.add(i);tall=heights[i];}int[]result=new int[out.size()];for(int i=0;i<result.length;i++)result[i]=out.get(result.length-1-i);return result;}
}
