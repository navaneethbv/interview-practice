class MyStack {
    private final Queue<Integer> queue=new ArrayDeque<>();
    public MyStack() {}
    public void push(int x) {queue.add(x);for(int i=1;i<queue.size();i++) queue.add(queue.remove());}
    public int pop() {return queue.remove();}
    public int top() {return queue.element();}
    public boolean empty() {return queue.isEmpty();}
}
