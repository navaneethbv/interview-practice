class SetOfStacks {
    private final int capacity;
    private final List<Deque<Integer>> stacks = new ArrayList<>();

    public SetOfStacks(int capacity) {
        this.capacity = capacity;
    }

    public void push(int value) {
        if (stacks.isEmpty() || stacks.get(stacks.size() - 1).size() == capacity) {
            stacks.add(new ArrayDeque<>());
        }
        stacks.get(stacks.size() - 1).push(value);
    }

    public int pop() {
        return popAt(stacks.size() - 1);
    }

    public int popAt(int index) {
        if (index < 0 || index >= stacks.size()) {
            return -1;
        }
        Deque<Integer> stack = stacks.get(index);
        int value = stack.pop();
        if (stack.isEmpty()) {
            stacks.remove(index);
        }
        return value;
    }

    public int stackCount() {
        return stacks.size();
    }
}
