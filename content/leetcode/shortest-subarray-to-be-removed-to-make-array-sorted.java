class Solution {
public int findLengthOfShortestSubarray(int[] arr){int n=arr.length,r=n-1;while(r>0&&arr[r-1]<=arr[r])r--;if(r==0)return 0;int best=r;for(int l=0;l<n&&(l==0||arr[l-1]<=arr[l]);l++){while(r<n&&arr[r]<arr[l])r++;best=Math.min(best,r-l-1);}return best;}
}
