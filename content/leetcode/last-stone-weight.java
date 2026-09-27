class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.reverseOrder());
        for (int weight : stones) {
            heap.add(weight);
        }
        while (heap.size() > 1) {
            int heaviest = heap.remove();
            int second = heap.remove();
            if (heaviest != second) {
                heap.add(heaviest - second);
            }
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }
}
