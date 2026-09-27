class Solution extends Reader4 {
    private final char[] pending = new char[4];
    private int index = 0;
    private int size = 0;

    public Solution() {
    }

    public int read(char[] buf, int n) {
        int copied = 0;
        while (copied < n) {
            if (index == size) {
                size = read4(pending);
                index = 0;
                if (size == 0) {
                    break;
                }
            }
            buf[copied++] = pending[index++];
        }
        return copied;
    }
}
