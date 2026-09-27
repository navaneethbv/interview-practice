class Solution {
public int[] nextGreaterElements(int[] nums){int n=nums.length;int[]out=new int[n];Arrays.fill(out,-1);Deque<Integer>stack=new ArrayDeque<>();for(int i=0;i<2*n;i++){while(!stack.isEmpty()&&nums[stack.peek()]<nums[i%n])out[stack.pop()]=nums[i%n];if(i<n)stack.push(i);}return out;}
}
