class NestedIterator implements Iterator<Integer> {
    private final Deque<NestedInteger> stack = new ArrayDeque<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        pushInReverse(nestedList);
    }

    private void pushInReverse(List<NestedInteger> values) {
        for (int index = values.size() - 1; index >= 0; index--) {
            stack.push(values.get(index));
        }
    }

    public boolean hasNext() {
        while (!stack.isEmpty() && !stack.peek().isInteger()) {
            pushInReverse(stack.pop().getList());
        }
        return !stack.isEmpty();
    }

    public Integer next() {
        hasNext();
        return stack.pop().getInteger();
    }
}
