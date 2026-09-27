class MyQueue {
    private Deque<Integer> incoming = new ArrayDeque<>();
    private Deque<Integer> outgoing = new ArrayDeque<>();

    public MyQueue() {
    }

    public void push(int x) {
        incoming.push(x);
    }

    private void transferIfNeeded() {
        if (!outgoing.isEmpty()) {
            return;
        }
        while (!incoming.isEmpty()) {
            outgoing.push(incoming.pop());
        }
    }

    public int pop() {
        transferIfNeeded();
        return outgoing.pop();
    }

    public int peek() {
        transferIfNeeded();
        return outgoing.peek();
    }

    public boolean empty() {
        return incoming.isEmpty() && outgoing.isEmpty();
    }
}
