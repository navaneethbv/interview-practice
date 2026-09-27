from bisect import bisect_right
class Solution:
    def jobScheduling(self, startTime, endTime, profit):
        jobs = sorted(zip(endTime, startTime, profit))
        end_times = []
        best_profit = [0]
        for finish_time, start_time, payment in jobs:
            previous_job = bisect_right(end_times, start_time)
            take_profit = best_profit[previous_job] + payment
            skip_profit = best_profit[-1]
            best_profit.append(max(skip_profit, take_profit))
            end_times.append(finish_time)
        return best_profit[-1]
