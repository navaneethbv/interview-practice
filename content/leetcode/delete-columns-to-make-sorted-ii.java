class Solution {
public int minDeletionSize(String[] strs) {
    boolean[] settled = new boolean[strs.length - 1];
    int removed = 0;
    for (int column = 0; column < strs[0].length(); column++) {
        boolean causesInversion = false;
        for (int row = 0; row < settled.length; row++) {
            if (!settled[row] && strs[row].charAt(column) > strs[row + 1].charAt(column)) {
                causesInversion = true;
                break;
            }
        }
        if (causesInversion) {
            removed++;
            continue;
        }
        for (int row = 0; row < settled.length; row++) {
            settled[row] |= strs[row].charAt(column) < strs[row + 1].charAt(column);
        }
    }
    return removed;
}
}
