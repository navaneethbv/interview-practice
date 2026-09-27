class Solution {
public int[] sortArray(int[] nums){int n=nums.length;int[]temp=new int[n];for(int width=1;width<n;width*=2){for(int start=0;start<n;start+=2*width){int mid=Math.min(start+width,n),end=Math.min(start+2*width,n),a=start,b=mid;for(int i=start;i<end;i++)if(a<mid&&(b==end||nums[a]<=nums[b]))temp[i]=nums[a++];else temp[i]=nums[b++];}int[]swap=nums;nums=temp;temp=swap;}return nums;}
}
