class ParkingSystem:
    def __init__(self, big, medium, small):
        self.available = [big, medium, small]

    def addCar(self, carType):
        slot = carType - 1
        if self.available[slot] == 0:
            return False
        self.available[slot] -= 1
        return True
