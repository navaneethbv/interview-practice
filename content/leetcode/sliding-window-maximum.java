class Solution {
public int[] maxSlidingWindow(int[] nums,int k) {
    Deque<Integer> q=new ArrayDeque<>();int[] result=new int[nums.length-k+1];
    for(int i=0;i<nums.length;i++) {while(!q.isEmpty()&&q.peekFirst()<=i-k) q.removeFirst();while(!q.isEmpty()&&nums[q.peekLast()]<=nums[i]) q.removeLast();q.addLast(i);if(i>=k-1) result[i-k+1]=nums[q.peekFirst()];}
    return result;
}
}
