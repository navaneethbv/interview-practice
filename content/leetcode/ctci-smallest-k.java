class Solution {
    public int[] smallestK(int[] arr, int k) {
        if (k == 0) {
            return new int[0];
        }
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int value : arr) {
            if (heap.size() < k) {
                heap.add(value);
            } else if (heap.peek() > value) {
                heap.poll();
                heap.add(value);
            }
        }
        int[] result = new int[heap.size()];
        int index = 0;
        for (int value : heap) {
            result[index++] = value;
        }
        return result;
    }
}
