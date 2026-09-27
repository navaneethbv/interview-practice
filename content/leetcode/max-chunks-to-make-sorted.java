class Solution {
    public int maxChunksToSorted(int[] arr) {
        int largestSeen = -1;
        int chunks = 0;
        for (int index = 0; index < arr.length; index++) {
            largestSeen = Math.max(largestSeen, arr[index]);
            if (largestSeen == index) {
                chunks++;
            }
        }
        return chunks;
    }
}
