class Solution:
    def mincostTickets(self, days, costs):
        travel=set(days); dp=[0]*366
        for day in range(1,366):
            dp[day]=dp[day-1] if day not in travel else min(dp[max(0,day-length)]+cost for length,cost in zip((1,7,30),costs))
        return dp[-1]
