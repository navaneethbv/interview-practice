class PeekingIterator implements Iterator<Integer> {
    private final Iterator<Integer> iterator;private boolean buffered;private Integer value;
    public PeekingIterator(Iterator<Integer> iterator) {this.iterator=iterator;}
    public Integer peek() {if(!buffered) {value=iterator.next();buffered=true;}return value;}
    public Integer next() {if(buffered) {buffered=false;return value;}return iterator.next();}
    public boolean hasNext() {return buffered||iterator.hasNext();}
}
