class Solution {
    public String solve(int R, int G, int B) {
        int[] counts = {B, G, R};
        String colors = "BGR";
        int present = 0;
        int only = -1;
        for (int i = 0; i < 3; i++) {
            if (counts[i] > 0) {
                present++;
                only = i;
            }
        }
        if (present == 1) {
            return colors.substring(only, only + 1);
        }
        if (present == 3) {
            return colors;
        }
        StringBuilder answer = new StringBuilder();
        for (int color = 0; color < 3; color++) {
            boolean possible = counts[color] == 0;
            for (int other = 0; other < 3; other++) {
                possible |= other != color && counts[other] >= 2;
            }
            if (possible) {
                answer.append(colors.charAt(color));
            }
        }
        return answer.toString();
    }
}
