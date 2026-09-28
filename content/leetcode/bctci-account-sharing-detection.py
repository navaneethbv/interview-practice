class Solution:
    def sharedAccountIp(self, connections):
        counts = {}
        for _, user in connections:
            counts[user] = counts.get(user, 0) + 1
        for ip, user in connections:
            if counts[user] > 1:
                return ip
        return ""
