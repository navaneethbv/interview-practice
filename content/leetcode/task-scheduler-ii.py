class Solution:
    def taskSchedulerII(self, tasks, space):
        ready = {}
        day = 0
        for task in tasks:
            day = max(day + 1, ready.get(task, 0))
            ready[task] = day + space + 1
        return day
