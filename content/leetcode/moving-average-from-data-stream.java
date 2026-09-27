class MovingAverage {
    private final int size;private final Deque<Integer> queue=new ArrayDeque<>();private long total;
    public MovingAverage(int size) {this.size=size;}
    public double next(int val) {queue.addLast(val);total+=val;if(queue.size()>size) total-=queue.removeFirst();return (double)total/queue.size();}
}
