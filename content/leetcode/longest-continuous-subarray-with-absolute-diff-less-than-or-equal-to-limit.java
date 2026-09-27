class Solution {
public int longestSubarray(int[] nums,int limit) {Deque<Integer> min=new ArrayDeque<>(),max=new ArrayDeque<>();int left=0,best=0;for(int r=0;r<nums.length;r++) {while(!min.isEmpty()&&nums[min.peekLast()]>nums[r]) min.removeLast();while(!max.isEmpty()&&nums[max.peekLast()]<nums[r]) max.removeLast();min.add(r);max.add(r);while(nums[max.peek()]-nums[min.peek()]>limit) {if(min.peek()==left) min.remove();if(max.peek()==left) max.remove();left++;}best=Math.max(best,r-left+1);}return best;}
}
