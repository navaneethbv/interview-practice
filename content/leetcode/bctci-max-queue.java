class MaxQueue {
    private Deque<Integer> queue = new ArrayDeque<>();
    private Deque<Integer> maximums = new ArrayDeque<>();

    public void push(int value) {
        queue.addLast(value);
        while (!maximums.isEmpty() && maximums.peekLast() < value) {
            maximums.removeLast();
        }
        maximums.addLast(value);
    }

    public int pop() {
        int value = queue.removeFirst();
        if (value == maximums.peekFirst()) {
            maximums.removeFirst();
        }
        return value;
    }

    public int peek() {
        return queue.peekFirst();
    }

    public int max() {
        return maximums.peekFirst();
    }

    public int size() {
        return queue.size();
    }
}
