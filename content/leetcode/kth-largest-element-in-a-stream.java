class KthLargest {
    private final int k;private final PriorityQueue<Integer> heap=new PriorityQueue<>();
    public KthLargest(int k,int[] nums) {this.k=k;for(int n:nums) {heap.add(n);if(heap.size()>k) heap.remove();}}
    public int add(int val) {heap.add(val);if(heap.size()>k) heap.remove();return heap.peek();}
}
