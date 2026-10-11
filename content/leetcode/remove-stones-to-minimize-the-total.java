class Solution {
    public int minStoneSum(int[] piles, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        int total = 0;
        for (int p : piles) {
            heap.add(p);
            total += p;
        }
        for (int i = 0; i < k; i++) {
            int largest = heap.poll();
            total -= largest / 2;
            heap.add(largest - largest / 2);
        }
        return total;
    }
}
