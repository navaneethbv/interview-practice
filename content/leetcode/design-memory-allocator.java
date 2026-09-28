class Allocator {
    private final int[] memory;

    public Allocator(int n) {
        memory = new int[n];
    }

    public int allocate(int size, int mID) {
        int freeRun = 0;
        for (int index = 0; index < memory.length; index++) {
            if (memory[index] == 0) {
                freeRun++;
            } else {
                freeRun = 0;
            }
            if (freeRun == size) {
                int start = index - size + 1;
                for (int cell = start; cell <= index; cell++) {
                    memory[cell] = mID;
                }
                return start;
            }
        }
        return -1;
    }

    public int freeMemory(int mID) {
        int freed = 0;
        for (int index = 0; index < memory.length; index++) {
            if (memory[index] == mID) {
                memory[index] = 0;
                freed++;
            }
        }
        return freed;
    }
}
