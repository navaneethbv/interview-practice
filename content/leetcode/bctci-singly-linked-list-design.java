class SinglyLinkedList {
    private static final class Node {
        final int val;
        Node next;

        Node(int val, Node next) {
            this.val = val;
            this.next = next;
        }
    }

    private Node head;
    private int length;

    public void pushFront(int v) {
        head = new Node(v, head);
        length++;
    }

    public int popFront() {
        if (head == null) {
            return -1;
        }
        int value = head.val;
        head = head.next;
        length--;
        return value;
    }

    public void pushBack(int v) {
        if (head == null) {
            pushFront(v);
            return;
        }
        Node node = head;
        while (node.next != null) {
            node = node.next;
        }
        node.next = new Node(v, null);
        length++;
    }

    public int popBack() {
        if (head == null || head.next == null) {
            return popFront();
        }
        Node node = head;
        while (node.next.next != null) {
            node = node.next;
        }
        int value = node.next.val;
        node.next = null;
        length--;
        return value;
    }

    public int size() {
        return length;
    }

    public boolean contains(int v) {
        Node node = head;
        while (node != null && node.val != v) {
            node = node.next;
        }
        return node != null;
    }
}
