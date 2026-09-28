class DynamicArray {
    private int[] values = new int[1];
    private int length = 0;

    public void append(int x) {
        if (length == values.length) {
            resize(values.length * 2);
        }
        values[length++] = x;
    }

    public int get(int i) {
        return values[i];
    }

    public void set(int i, int x) {
        values[i] = x;
    }

    public int size() {
        return length;
    }

    public void popBack() {
        length--;
        if (values.length > 1 && length <= values.length / 4) {
            resize(values.length / 2);
        }
    }

    private void resize(int capacity) {
        int[] next = new int[capacity];
        System.arraycopy(values, 0, next, 0, length);
        values = next;
    }
}
