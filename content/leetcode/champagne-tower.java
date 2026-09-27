class Solution {
public double champagneTower(int poured,int query_row,int query_glass){double[]row={poured};for(int r=0;r<query_row;r++){double[]next=new double[row.length+1];for(int i=0;i<row.length;i++){double excess=Math.max(0,(row[i]-1)/2);next[i]+=excess;next[i+1]+=excess;}row=next;}return Math.min(1,row[query_glass]);}
}
