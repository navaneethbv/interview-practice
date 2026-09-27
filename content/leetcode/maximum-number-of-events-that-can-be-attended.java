class Solution {
public int maxEvents(int[][] events) {Arrays.sort(events,Comparator.comparingInt(e->e[0]));PriorityQueue<Integer> heap=new PriorityQueue<>();int i=0,day=0,count=0;while(i<events.length||!heap.isEmpty()) {if(heap.isEmpty()) day=Math.max(day,events[i][0]);while(i<events.length&&events[i][0]<=day) heap.add(events[i++][1]);while(!heap.isEmpty()&&heap.peek()<day) heap.remove();if(!heap.isEmpty()) {heap.remove();count++;}day++;}return count;}
}
