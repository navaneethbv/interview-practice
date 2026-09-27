class Solution {
public List<String> findItinerary(List<List<String>> tickets){Map<String,PriorityQueue<String>>g=new HashMap<>();for(List<String>t:tickets)g.computeIfAbsent(t.get(0),x->new PriorityQueue<>()).add(t.get(1));Deque<String>stack=new ArrayDeque<>();LinkedList<String>out=new LinkedList<>();stack.push("JFK");while(!stack.isEmpty()){PriorityQueue<String>q=g.get(stack.peek());if(q!=null&&!q.isEmpty())stack.push(q.remove());else out.addFirst(stack.pop());}return out;}
}
