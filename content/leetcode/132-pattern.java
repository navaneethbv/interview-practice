class Solution {
public boolean find132pattern(int[] nums){Deque<Integer> stack=new ArrayDeque<>();int middle=Integer.MIN_VALUE;for(int i=nums.length-1;i>=0;i--){int x=nums[i];if(x<middle)return true;while(!stack.isEmpty()&&stack.peek()<x)middle=stack.pop();stack.push(x);}return false;}
}
