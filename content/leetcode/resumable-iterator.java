class ResumableIterator {
    private final int[][] files;
    private final int[] fileOf;
    private final int[] offsetOf;
    private int position = 0;

    public ResumableIterator(int[][] files) {
        this.files = files;
        int total = 0;
        for (int[] f : files) {
            total += f.length;
        }
        fileOf = new int[total];
        offsetOf = new int[total];
        int k = 0;
        for (int i = 0; i < files.length; i++) {
            for (int j = 0; j < files[i].length; j++) {
                fileOf[k] = i;
                offsetOf[k++] = j;
            }
        }
    }

    public boolean hasNext() {
        return position < fileOf.length;
    }

    public int next() {
        int value = files[fileOf[position]][offsetOf[position]];
        position++;
        return value;
    }

    public int getState() {
        return position;
    }

    public void setState(int state) {
        position = state;
    }
}
