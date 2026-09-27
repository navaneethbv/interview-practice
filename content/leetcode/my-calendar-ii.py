class MyCalendarTwo:
    def __init__(self):
        self.bookings = []
        self.double_booked = []

    def book(self, startTime, endTime):
        for overlap_start, overlap_end in self.double_booked:
            if max(startTime, overlap_start) < min(endTime, overlap_end):
                return False
        for booked_start, booked_end in self.bookings:
            overlap_start = max(startTime, booked_start)
            overlap_end = min(endTime, booked_end)
            if overlap_start < overlap_end:
                self.double_booked.append((overlap_start, overlap_end))
        self.bookings.append((startTime, endTime))
        return True
