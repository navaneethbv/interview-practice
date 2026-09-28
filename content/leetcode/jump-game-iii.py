class Solution:
    def canReach(self, arr, start):
        seen = {start}
        pending = [start]
        while pending:
            index = pending.pop()
            if arr[index] == 0:
                return True
            for destination in (index - arr[index], index + arr[index]):
                if 0 <= destination < len(arr) and destination not in seen:
                    seen.add(destination)
                    pending.append(destination)
        return False
