class Solution:
    def _totals(self, slots, bookings):
        delta = [0] * (len(slots) + 1)
        for l, r, c in bookings:
            delta[l] += c
            delta[r + 1] -= c
        totals, running = [], 0
        for index, booked in enumerate(slots):
            running += delta[index]
            totals.append(booked + running)
        return totals

    def mostBookedSlot(self, slots, bookings):
        totals = self._totals(slots, bookings)
        return totals.index(max(totals))
