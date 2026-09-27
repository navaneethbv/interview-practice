class MyStack {
    private final Queue<Integer> queue = new ArrayDeque<>();

    public MyStack() {
    }

    public void push(int x) {
        queue.add(x);
        int olderValues = queue.size() - 1;
        for (int count = 0; count < olderValues; count++) {
            queue.add(queue.remove());
        }
    }

    public int pop() {
        return queue.remove();
    }

    public int top() {
        return queue.element();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}
