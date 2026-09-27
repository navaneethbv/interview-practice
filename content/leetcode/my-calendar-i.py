class MyCalendar:
    def __init__(self):self.bookings=[]
    def book(self,startTime,endTime):
        if any(max(a,startTime)<min(b,endTime) for a,b in self.bookings):return False
        self.bookings.append((startTime,endTime));return True
