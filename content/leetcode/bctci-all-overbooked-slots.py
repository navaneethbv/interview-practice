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

    def overbookedSlots(self, slots, bookings, cap):
        return sum(1 for total in self._totals(slots, bookings) if total > cap)
