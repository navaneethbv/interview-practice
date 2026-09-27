class Solution {
private int inversion(int a,int b,long[] values) {return a>=0&&b>=0&&values[a]>values[b]?1:0;}
public int minimumPairRemoval(int[] nums) {
    int n=nums.length;long[] values=new long[n];int[] previous=new int[n],next=new int[n];boolean[] alive=new boolean[n];Arrays.fill(alive,true);
    PriorityQueue<long[]> heap=new PriorityQueue<>((a,b)->a[0]!=b[0]?Long.compare(a[0],b[0]):Long.compare(a[1],b[1]));
    for(int i=0;i<n;i++) {values[i]=nums[i];previous[i]=i-1;next[i]=i+1<n?i+1:-1;}int bad=0,operations=0;for(int i=0;i+1<n;i++) {heap.add(new long[]{values[i]+values[i+1],i,i+1});bad+=inversion(i,i+1,values);}
    while(bad>0) {long[] edge=heap.remove();int left=(int)edge[1],right=(int)edge[2];if(!alive[left]||!alive[right]||next[left]!=right||values[left]+values[right]!=edge[0]) continue;int before=previous[left],after=next[right];bad-=inversion(before,left,values)+inversion(left,right,values)+inversion(right,after,values);values[left]=edge[0];alive[right]=false;next[left]=after;if(after>=0) previous[after]=left;bad+=inversion(before,left,values)+inversion(left,after,values);if(before>=0) heap.add(new long[]{values[before]+values[left],before,left});if(after>=0) heap.add(new long[]{values[left]+values[after],left,after});operations++;}
    return operations;
}
}
