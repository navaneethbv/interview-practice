class Solution:
    def angleClock(self,hour,minutes):
        angle=abs((hour%12)*30+minutes*0.5-minutes*6)
        return min(angle,360-angle)
