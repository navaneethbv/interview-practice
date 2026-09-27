class Solution {
public int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> heap=new PriorityQueue<>(Comparator.reverseOrder());for(int s:stones) heap.add(s);
    while(heap.size()>1) {int a=heap.remove(),b=heap.remove();if(a!=b) heap.add(a-b);}return heap.isEmpty()?0:heap.peek();
}
}
