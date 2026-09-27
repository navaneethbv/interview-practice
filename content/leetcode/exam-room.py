from bisect import insort


class ExamRoom:
    def __init__(self, n):
        self.capacity = n
        self.occupied = []

    def seat(self):
        if not self.occupied:
            chosen_seat = 0
        else:
            chosen_seat = 0
            best_distance = self.occupied[0]
            for left, right in zip(self.occupied, self.occupied[1:]):
                distance = (right - left) // 2
                if distance > best_distance:
                    best_distance = distance
                    chosen_seat = (left + right) // 2
            right_distance = self.capacity - 1 - self.occupied[-1]
            if right_distance > best_distance:
                chosen_seat = self.capacity - 1
        insort(self.occupied, chosen_seat)
        return chosen_seat

    def leave(self, p):
        self.occupied.remove(p)
