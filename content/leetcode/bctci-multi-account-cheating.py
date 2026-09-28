class Solution:
    def hasSharedIpSet(self, users):
        seen = set()
        for user in users:
            key = tuple(sorted(user[1:]))
            if key in seen:
                return True
            seen.add(key)
        return False
