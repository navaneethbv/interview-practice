class MyCircularQueue {
    private final int[] values;
    private int head = 0;
    private int size = 0;

    public MyCircularQueue(int k) {
        values = new int[k];
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }
        int tail = (head + size) % values.length;
        values[tail] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }
        head = (head + 1) % values.length;
        size--;
        return true;
    }

    public int Front() {
        return isEmpty() ? -1 : values[head];
    }

    public int Rear() {
        if (isEmpty()) {
            return -1;
        }
        int tail = (head + size - 1) % values.length;
        return values[tail];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == values.length;
    }
}
