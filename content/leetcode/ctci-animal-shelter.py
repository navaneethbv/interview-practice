from collections import deque


class AnimalShelter:
    def __init__(self):
        self.arrivals = 0
        self.queues = {"dog": deque(), "cat": deque()}

    def enqueue(self, name, species):
        self.queues[species].append((self.arrivals, name))
        self.arrivals += 1

    def dequeueAny(self):
        dogs = self.queues["dog"]
        cats = self.queues["cat"]
        if not dogs:
            return self.dequeueCat()
        if not cats:
            return self.dequeueDog()
        return self.dequeueDog() if dogs[0][0] < cats[0][0] else self.dequeueCat()

    def dequeueDog(self):
        return self._release("dog")

    def dequeueCat(self):
        return self._release("cat")

    def _release(self, species):
        queue = self.queues[species]
        return queue.popleft()[1] if queue else ""
