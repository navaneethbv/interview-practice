class MyCalendarTwo:
    def __init__(self):self.bookings=[];self.doubles=[]
    def book(self,startTime,endTime):
        if any(max(startTime,a)<min(endTime,b) for a,b in self.doubles):return False
        for a,b in self.bookings:
            lo,hi=max(startTime,a),min(endTime,b)
            if lo<hi:self.doubles.append((lo,hi))
        self.bookings.append((startTime,endTime));return True
