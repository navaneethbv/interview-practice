class Solution {
public int[] canSeePersonsCount(int[] heights){int[]out=new int[heights.length];Deque<Integer>stack=new ArrayDeque<>();for(int i=heights.length-1;i>=0;i--){while(!stack.isEmpty()&&stack.peek()<heights[i]){stack.pop();out[i]++;}if(!stack.isEmpty())out[i]++;stack.push(heights[i]);}return out;}
}
