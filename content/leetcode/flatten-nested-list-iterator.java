class NestedIterator implements Iterator<Integer> {
    private final Deque<NestedInteger> stack=new ArrayDeque<>();
    public NestedIterator(List<NestedInteger> nestedList) {push(nestedList);}
    private void push(List<NestedInteger> values) {for(int i=values.size()-1;i>=0;i--) stack.push(values.get(i));}
    public boolean hasNext() {while(!stack.isEmpty()&&!stack.peek().isInteger()) push(stack.pop().getList());return !stack.isEmpty();}
    public Integer next() {hasNext();return stack.pop().getInteger();}
}
