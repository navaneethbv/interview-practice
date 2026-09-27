class Solution {
public int[] nextGreaterElement(int[] nums1,int[] nums2) {Deque<Integer> stack=new ArrayDeque<>();Map<Integer,Integer> next=new HashMap<>();for(int n:nums2) {while(!stack.isEmpty()&&stack.peek()<n) next.put(stack.pop(),n);stack.push(n);}int[] result=new int[nums1.length];for(int i=0;i<nums1.length;i++) result[i]=next.getOrDefault(nums1[i],-1);return result;}
}
