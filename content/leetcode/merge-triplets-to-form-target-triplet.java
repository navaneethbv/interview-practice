class Solution {
public boolean mergeTriplets(int[][] triplets,int[] target){boolean[]seen=new boolean[3];for(int[]t:triplets)if(t[0]<=target[0]&&t[1]<=target[1]&&t[2]<=target[2])for(int j=0;j<3;j++)seen[j]|=t[j]==target[j];return seen[0]&&seen[1]&&seen[2];}
}
