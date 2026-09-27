class Solution:
    def asteroidCollision(self, asteroids):
        survivors = []
        for value in asteroids:
            survives = True
            while survives and value < 0 and survivors and survivors[-1] > 0:
                if survivors[-1] < -value:
                    survivors.pop()
                else:
                    if survivors[-1] == -value:
                        survivors.pop()
                    survives = False
            if survives:
                survivors.append(value)
        return survivors
