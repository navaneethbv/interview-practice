class Solution {
public long findScore(int[] nums){Integer[]indices=new Integer[nums.length];for(int i=0;i<indices.length;i++)indices[i]=i;Arrays.sort(indices,(a,b)->nums[a]==nums[b]?Integer.compare(a,b):Integer.compare(nums[a],nums[b]));boolean[]marked=new boolean[nums.length];long score=0;for(int i:indices)if(!marked[i]){score+=nums[i];marked[i]=true;if(i>0)marked[i-1]=true;if(i+1<nums.length)marked[i+1]=true;}return score;}
}
