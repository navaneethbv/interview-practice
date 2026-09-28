class Solution {
    public int tallestStack(int[][] boxes) {
        int[][] ordered = boxes.clone();
        Arrays.sort(ordered, Comparator.comparingInt(box -> box[1]));
        int[] bestWithBase = new int[ordered.length];
        int best = 0;
        for (int index = 0; index < ordered.length; index++) {
            int tallestAbove = 0;
            for (int above = 0; above < index; above++) {
                if (fitsOn(ordered[above], ordered[index])) {
                    tallestAbove = Math.max(tallestAbove, bestWithBase[above]);
                }
            }
            bestWithBase[index] = ordered[index][1] + tallestAbove;
            best = Math.max(best, bestWithBase[index]);
        }
        return best;
    }

    private boolean fitsOn(int[] top, int[] bottom) {
        return top[0] < bottom[0] && top[1] < bottom[1] && top[2] < bottom[2];
    }
}
