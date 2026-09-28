class Solution:
    def getCollisionTimes(self, cars):
        collision = [-1.0] * len(cars)
        candidates = []
        for index in range(len(cars) - 1, -1, -1):
            position, speed = cars[index]
            while candidates:
                next_index = candidates[-1]
                next_position, next_speed = cars[next_index]
                if speed <= next_speed:
                    candidates.pop()
                    continue
                time = (next_position - position) / (speed - next_speed)
                if collision[next_index] < 0 or time <= collision[next_index]:
                    collision[index] = time
                    break
                candidates.pop()
            candidates.append(index)
        return collision
