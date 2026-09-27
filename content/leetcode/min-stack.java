class MinStack {
    private record Entry(int value, int minimum) {}

    private final Deque<Entry> stack = new ArrayDeque<>();

    public MinStack() {}

    public void push(int val) {
        int minimum = stack.isEmpty() ? val : Math.min(val, stack.peek().minimum());
        stack.push(new Entry(val, minimum));
    }

    public void pop() {
        stack.pop();
    }

    public int top() {
        return stack.peek().value();
    }

    public int getMin() {
        return stack.peek().minimum();
    }
}
