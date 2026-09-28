class Solution {
    public int numComponents(ListNode head, int[] nums) {
        Set<Integer> selected = new HashSet<>();
        for (int value : nums) {
            selected.add(value);
        }
        int components = 0;
        boolean inside = false;
        while (head != null) {
            boolean selectedNode = selected.contains(head.val);
            if (selectedNode && !inside) {
                components++;
            }
            inside = selectedNode;
            head = head.next;
        }
        return components;
    }
}
