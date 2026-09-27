class Solution {
public int[] nextLargerNodes(ListNode head) {List<Integer> values=new ArrayList<>();for(ListNode p=head;p!=null;p=p.next) values.add(p.val);int[] result=new int[values.size()];Deque<Integer> stack=new ArrayDeque<>();for(int i=0;i<values.size();i++) {while(!stack.isEmpty()&&values.get(stack.peek())<values.get(i)) result[stack.pop()]=values.get(i);stack.push(i);}return result;}
}
