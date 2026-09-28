class LinkedQueue {
    private static final class Node {
        final int val;
        Node next;

        Node(int val) {
            this.val = val;
        }
    }

    private Node head;
    private Node tail;
    private int length;

    public void push(int v) {
        Node node = new Node(v);
        if (tail == null) {
            head = node;
        } else {
            tail.next = node;
        }
        tail = node;
        length++;
    }

    public int pop() {
        if (head == null) {
            return -1;
        }
        int value = head.val;
        head = head.next;
        if (head == null) {
            tail = null;
        }
        length--;
        return value;
    }

    public int peek() {
        return head == null ? -1 : head.val;
    }

    public int size() {
        return length;
    }

    public boolean empty() {
        return length == 0;
    }
}
