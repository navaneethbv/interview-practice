class Solution:
    def exclusiveTime(self, n, logs):
        durations = [0] * n
        call_stack = []
        previous_time = 0

        for log in logs:
            function_id, event, timestamp = log.split(":")
            function_id = int(function_id)
            timestamp = int(timestamp)

            if event == "start":
                if call_stack:
                    durations[call_stack[-1]] += timestamp - previous_time
                call_stack.append(function_id)
                previous_time = timestamp
            else:
                durations[call_stack.pop()] += timestamp - previous_time + 1
                previous_time = timestamp + 1

        return durations
