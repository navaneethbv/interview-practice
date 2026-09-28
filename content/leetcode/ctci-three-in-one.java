class FixedMultiStack {
    private static final int STACKS = 3;
    private final int capacity;
    private final int[] values;
    private final int[] sizes = new int[STACKS];

    public FixedMultiStack(int stackSize) {
        capacity = stackSize;
        values = new int[stackSize * STACKS];
    }

    public boolean push(int stackNum, int value) {
        if (sizes[stackNum] == capacity) {
            return false;
        }
        values[topIndex(stackNum) + 1] = value;
        sizes[stackNum]++;
        return true;
    }

    public int pop(int stackNum) {
        if (isEmpty(stackNum)) {
            return -1;
        }
        int value = values[topIndex(stackNum)];
        sizes[stackNum]--;
        return value;
    }

    public int peek(int stackNum) {
        if (isEmpty(stackNum)) {
            return -1;
        }
        return values[topIndex(stackNum)];
    }

    public boolean isEmpty(int stackNum) {
        return sizes[stackNum] == 0;
    }

    private int topIndex(int stackNum) {
        return stackNum * capacity + sizes[stackNum] - 1;
    }
}
