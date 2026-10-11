function findCycleStart(head) {
    let slow = head, fast = head;
    while (fast?.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    let p = head;
    while (p !== slow) {
        p = p.next;
        slow = slow.next;
    }
    return p;
}
