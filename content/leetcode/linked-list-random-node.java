class Solution {
    private final ListNode head;
    private final Random random = new Random();

    public Solution(ListNode head) {
        this.head = head;
    }

    public int getRandom() {
        int chosen = 0;
        int seen = 0;
        for (ListNode node = head; node != null; node = node.next) {
            seen++;
            if (random.nextInt(seen) == 0) {
                chosen = node.val;
            }
        }
        return chosen;
    }
}
