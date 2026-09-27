from collections import deque
class Solution:
    def maxTaskAssign(self, tasks, workers, pills, strength):
        tasks.sort()
        workers.sort()
        low = 0
        high = min(len(tasks), len(workers))
        while low < high:
            middle = (low + high + 1) // 2
            if self._possible(tasks, workers, pills, strength, middle):
                low = middle
            else:
                high = middle - 1
        return low

    def _possible(self, tasks, workers, pills, strength, task_count):
        """Whether the strongest workers can complete the easiest tasks."""
        candidates = deque()
        task_index = 0
        remaining_pills = pills
        for worker in workers[len(workers) - task_count:]:
            while task_index < task_count and tasks[task_index] <= worker + strength:
                candidates.append(tasks[task_index])
                task_index += 1
            if not candidates:
                return False
            if candidates[0] <= worker:
                candidates.popleft()
            elif remaining_pills:
                remaining_pills -= 1
                candidates.pop()
            else:
                return False
        return True
