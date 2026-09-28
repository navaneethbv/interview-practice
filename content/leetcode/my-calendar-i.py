class MyCalendar:
    def __init__(self):
        self.bookings = []

    def book(self, startTime, endTime):
        for previous_start, previous_end in self.bookings:
            if max(previous_start, startTime) < min(previous_end, endTime):
                return False
        self.bookings.append((startTime, endTime))
        return True
