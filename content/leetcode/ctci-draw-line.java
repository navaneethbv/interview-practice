class Solution {
    public int[] drawLine(int[] screen, int width, int x1, int x2, int y) {
        int[] result = screen.clone();
        int rowStart = y * (width / 8);
        int firstByte = x1 / 8;
        int lastByte = x2 / 8;
        int startMask = 0xFF >> (x1 % 8);
        int endMask = (0xFF << (7 - x2 % 8)) & 0xFF;
        if (firstByte == lastByte) {
            result[rowStart + firstByte] |= startMask & endMask;
            return result;
        }
        result[rowStart + firstByte] |= startMask;
        for (int b = firstByte + 1; b < lastByte; b++) {
            result[rowStart + b] = 0xFF;
        }
        result[rowStart + lastByte] |= endMask;
        return result;
    }
}
