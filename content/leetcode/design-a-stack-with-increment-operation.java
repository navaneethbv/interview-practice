class CustomStack {
    private final int[] values;
    private final int[] pending;
    private int size;

    public CustomStack(int maxSize) {
        values = new int[maxSize];
        pending = new int[maxSize];
    }

    public void push(int x) {
        if (size >= values.length) {
            return;
        }
        values[size] = x;
        pending[size] = 0;
        size++;
    }

    public int pop() {
        if (size == 0) {
            return -1;
        }
        size--;
        int extra = pending[size];
        if (size > 0) {
            pending[size - 1] += extra;
        }
        return values[size] + extra;
    }

    public void increment(int k, int val) {
        if (size > 0) {
            pending[Math.min(k, size) - 1] += val;
        }
    }
}
