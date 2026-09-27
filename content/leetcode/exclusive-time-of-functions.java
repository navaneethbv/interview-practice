class Solution {
public int[] exclusiveTime(int n,List<String> logs){int[]out=new int[n];Deque<Integer>stack=new ArrayDeque<>();int previous=0;for(String log:logs){String[]p=log.split(":");int id=Integer.parseInt(p[0]),t=Integer.parseInt(p[2]);if(p[1].equals("start")){if(!stack.isEmpty())out[stack.peek()]+=t-previous;stack.push(id);previous=t;}else{out[stack.pop()]+=t-previous+1;previous=t+1;}}return out;}
}
