class Solution {
public boolean canThreePartsEqualSum(int[] arr){int total=Arrays.stream(arr).sum();if(total%3!=0)return false;int target=total/3,sum=0,parts=0;for(int x:arr){sum+=x;if(sum==target){parts++;sum=0;}}return parts>=3;}
}
