class Solution:
    def fewestRuns(self, meetings):
        runs = 0
        last_run = -1
        for start, end in sorted(meetings, key=lambda meeting: meeting[1]):
            if start > last_run:
                runs += 1
                last_run = end
        return runs
