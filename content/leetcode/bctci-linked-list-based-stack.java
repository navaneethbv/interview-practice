class LinkedStack {
    private static final class Node {
        final int val;
        final Node next;

        Node(int val, Node next) {
            this.val = val;
            this.next = next;
        }
    }

    private Node top;
    private int length;

    public void push(int v) {
        top = new Node(v, top);
        length++;
    }

    public int pop() {
        if (top == null) {
            return -1;
        }
        int value = top.val;
        top = top.next;
        length--;
        return value;
    }

    public int peek() {
        return top == null ? -1 : top.val;
    }

    public int size() {
        return length;
    }

    public boolean empty() {
        return length == 0;
    }
}
