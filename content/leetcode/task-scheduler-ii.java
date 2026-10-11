class Solution {
    public long taskSchedulerII(int[] tasks, int space) {
        Map<Integer, Long> ready = new HashMap<>();
        long day = 0;
        for (int task : tasks) {
            day = Math.max(day + 1, ready.getOrDefault(task, 0L));
            ready.put(task, day + space + 1);
        }
        return day;
    }
}
