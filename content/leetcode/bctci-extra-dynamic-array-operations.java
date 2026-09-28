class DynamicArrayExtras {
    private int[] values = new int[1];
    private int length = 0;

    public void append(int x) {
        insert(length, x);
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
    }

    public int pop(int i) {
        int removed = values[i];
        System.arraycopy(values, i + 1, values, i, length - i - 1);
        length--;
        return removed;
    }

    public boolean contains(int x) {
        for (int index = 0; index < length; index++) {
            if (values[index] == x) {
                return true;
            }
        }
        return false;
    }

    public void insert(int i, int x) {
        if (length == values.length) {
            values = Arrays.copyOf(values, values.length * 2);
        }
        System.arraycopy(values, i, values, i + 1, length - i);
        values[i] = x;
        length++;
    }

    public int remove(int x) {
        for (int index = 0; index < length; index++) {
            if (values[index] == x) {
                pop(index);
                return index;
            }
        }
        return -1;
    }
}
