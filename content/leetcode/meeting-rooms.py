class Solution:
    def canAttendMeetings(self, intervals):
        intervals = sorted(intervals)
        for index in range(1, len(intervals)):
            if intervals[index - 1][1] > intervals[index][0]:
                return False
        return True
