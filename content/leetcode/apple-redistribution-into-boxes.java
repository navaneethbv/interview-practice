class Solution {
    public int minimumBoxes(int[] apple, int[] capacity) {
        int totalApples = 0;
        for (int count : apple) {
            totalApples += count;
        }
        Arrays.sort(capacity);
        int boxes = 0;
        for (int index = capacity.length - 1; index >= 0; index--) {
            totalApples -= capacity[index];
            boxes++;
            if (totalApples <= 0) {
                return boxes;
            }
        }
        return boxes;
    }
}
