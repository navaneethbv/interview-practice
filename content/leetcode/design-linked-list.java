class MyLinkedList {
    private static class Link {
        int value;
        Link next;

        Link(int value, Link next) {
            this.value = value;
            this.next = next;
        }
    }

    private final Link head = new Link(0, null);
    private int size;

    public MyLinkedList() {
    }

    public int get(int index) {
        if (index < 0 || index >= size) {
            return -1;
        }
        Link node = nodeBefore(index).next;
        return node.value;
    }

    public void addAtHead(int val) {
        addAtIndex(0, val);
    }

    public void addAtTail(int val) {
        addAtIndex(size, val);
    }

    public void addAtIndex(int index, int val) {
        if (index < 0) {
            index = 0;
        }
        if (index > size) {
            return;
        }
        Link previous = nodeBefore(index);
        previous.next = new Link(val, previous.next);
        size++;
    }

    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }
        Link previous = nodeBefore(index);
        previous.next = previous.next.next;
        size--;
    }

    private Link nodeBefore(int index) {
        Link node = head;
        for (int step = 0; step < index; step++) {
            node = node.next;
        }
        return node;
    }
}
