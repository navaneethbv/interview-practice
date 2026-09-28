from collections import Counter


class Checker:
    def __init__(self, s):
        self.length = len(s)
        self.counts = Counter(s)

    def expands_into(self, s2):
        if len(s2) != self.length + 1:
            return False
        extra = Counter(s2)
        extra.subtract(self.counts)
        return all(count >= 0 for count in extra.values()) and sum(extra.values()) == 1
