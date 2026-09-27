class Solution {
    private boolean possible(int taskCount, int[] tasks, int[] workers, int pills, int strength) {
        ArrayDeque<Integer> candidates = new ArrayDeque<>();
        int taskIndex = 0;
        for (int workerIndex = workers.length - taskCount; workerIndex < workers.length; workerIndex++) {
            int worker = workers[workerIndex];
            while (taskIndex < taskCount && (long) tasks[taskIndex] <= (long) worker + strength) {
                candidates.addLast(tasks[taskIndex]);
                taskIndex++;
            }
            if (candidates.isEmpty()) {
                return false;
            }
            if (candidates.peekFirst() <= worker) {
                candidates.removeFirst();
            } else if (pills > 0) {
                pills--;
                candidates.removeLast();
            } else {
                return false;
            }
        }
        return true;
    }

    public int maxTaskAssign(int[] tasks, int[] workers, int pills, int strength) {
        Arrays.sort(tasks);
        Arrays.sort(workers);
        int low = 0;
        int high = Math.min(tasks.length, workers.length);
        while (low < high) {
            int middle = (low + high + 1) / 2;
            if (possible(middle, tasks, workers, pills, strength)) {
                low = middle;
            } else {
                high = middle - 1;
            }
        }
        return low;
    }
}
