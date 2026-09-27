class PeekingIterator implements Iterator<Integer> {
    private final Iterator<Integer> iterator;
    private boolean hasBuffer;
    private Integer buffer;

    public PeekingIterator(Iterator<Integer> iterator) {
        this.iterator = iterator;
    }

    public Integer peek() {
        if (!hasBuffer) {
            buffer = iterator.next();
            hasBuffer = true;
        }
        return buffer;
    }

    public Integer next() {
        if (hasBuffer) {
            hasBuffer = false;
            return buffer;
        }
        return iterator.next();
    }

    public boolean hasNext() {
        return hasBuffer || iterator.hasNext();
    }
}
