class Solution:
    def mostSharedAccount(self, connections):
        counts = {}
        for _, user in connections:
            counts[user] = counts.get(user, 0) + 1
        best = ""
        for user, count in counts.items():
            if not best or count > counts[best]:
                best = user
        return best
