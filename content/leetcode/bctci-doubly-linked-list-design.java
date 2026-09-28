class DoublyLinkedList {
    private static final class Node {
        final int val;
        Node prev;
        Node next;

        Node(int val) {
            this.val = val;
        }
    }

    private final Node head = new Node(0);
    private final Node tail = new Node(0);
    private int length;

    public DoublyLinkedList() {
        head.next = tail;
        tail.prev = head;
    }

    private void insertAfter(Node node, int v) {
        Node fresh = new Node(v);
        fresh.prev = node;
        fresh.next = node.next;
        node.next.prev = fresh;
        node.next = fresh;
        length++;
    }

    private int remove(Node node) {
        if (node == head || node == tail) {
            return -1;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
        length--;
        return node.val;
    }

    public void pushFront(int v) {
        insertAfter(head, v);
    }

    public int popFront() {
        return remove(head.next);
    }

    public void pushBack(int v) {
        insertAfter(tail.prev, v);
    }

    public int popBack() {
        return remove(tail.prev);
    }

    public int size() {
        return length;
    }

    public boolean contains(int v) {
        for (Node node = head.next; node != tail; node = node.next) {
            if (node.val == v) {
                return true;
            }
        }
        return false;
    }
}
