class ParkingSystem:
    def __init__(self,big,medium,small): self.available=[big,medium,small]
    def addCar(self,carType):
        if self.available[carType-1]==0: return False
        self.available[carType-1]-=1; return True
