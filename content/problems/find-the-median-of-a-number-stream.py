class MedianOfAStream:
    def __init__(self):
        self.lo, self.hi = [], []

    def insert_num(self, num: int) -> None:
        if not self.lo or -self.lo[0] >= num:
            heappush(self.lo, -num)
        else:
            heappush(self.hi, num)
        if len(self.lo) > len(self.hi) + 1:
            heappush(self.hi, -heappop(self.lo))
        elif len(self.lo) < len(self.hi):
            heappush(self.lo, -heappop(self.hi))

    def find_median(self) -> float:
        if len(self.lo) == len(self.hi):
            return (-self.lo[0] + self.hi[0]) / 2.0
        return -self.lo[0] / 1.0
