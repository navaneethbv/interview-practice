class Heap {
    private final boolean isMin;
    private int[] items;
    private int length;

    public Heap(String kind, int[] values) {
        isMin = kind.equals("min");
        items = Arrays.copyOf(values, Math.max(1, values.length));
        length = values.length;
        for (int index = length / 2 - 1; index >= 0; index--) {
            siftDown(index);
        }
    }

    private boolean before(int a, int b) {
        return isMin ? a < b : a > b;
    }

    public void push(int x) {
        if (length == items.length) {
            items = Arrays.copyOf(items, items.length * 2);
        }
        int index = length++;
        items[index] = x;
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (!before(items[index], items[parent])) {
                break;
            }
            swap(index, parent);
            index = parent;
        }
    }

    public int pop() {
        if (length == 0) {
            return -1;
        }
        int top = items[0];
        items[0] = items[--length];
        siftDown(0);
        return top;
    }

    public int top() {
        return length == 0 ? -1 : items[0];
    }

    public int size() {
        return length;
    }

    private void siftDown(int index) {
        while (true) {
            int best = index;
            for (int child = 2 * index + 1; child <= 2 * index + 2; child++) {
                if (child < length && before(items[child], items[best])) {
                    best = child;
                }
            }
            if (best == index) {
                return;
            }
            swap(index, best);
            index = best;
        }
    }

    private void swap(int i, int j) {
        int temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
}
