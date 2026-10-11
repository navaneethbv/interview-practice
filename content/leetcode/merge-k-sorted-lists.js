const mergeKLists = function(lists) {
    const values = [];
    for (let node of lists) {
        for (; node; node = node.next) values.push(node.val);
    }
    values.sort((a, b) => a - b);
    const dummy = new ListNode();
    let tail = dummy;
    for (const v of values) {
        tail.next = new ListNode(v);
        tail = tail.next;
    }
    return dummy.next;
};
