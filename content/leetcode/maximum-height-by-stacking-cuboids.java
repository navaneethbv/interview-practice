class Solution {
public int maxHeight(int[][] cuboids){for(int[] c:cuboids)Arrays.sort(c);Arrays.sort(cuboids,(a,b)->a[0]!=b[0]?a[0]-b[0]:a[1]!=b[1]?a[1]-b[1]:a[2]-b[2]);int[] d=new int[cuboids.length];int ans=0;for(int i=0;i<d.length;i++){d[i]=cuboids[i][2];for(int j=0;j<i;j++)if(cuboids[j][0]<=cuboids[i][0]&&cuboids[j][1]<=cuboids[i][1]&&cuboids[j][2]<=cuboids[i][2])d[i]=Math.max(d[i],d[j]+cuboids[i][2]);ans=Math.max(ans,d[i]);}return ans;}
}
