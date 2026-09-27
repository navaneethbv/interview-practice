class Solution {
public int smallestDivisor(int[] nums,int threshold) {int l=1,r=Arrays.stream(nums).max().getAsInt();while(l<r) {int m=(l+r)/2;long sum=0;for(int n:nums) sum+=(n+m-1)/m;if(sum<=threshold) r=m;else l=m+1;}return l;}
}
