class Solution:
    def maximumPopulation(self, logs):
        changes = [0] * 101
        for birth, death in logs:
            changes[birth - 1950] += 1
            changes[death - 1950] -= 1
        population = 0
        best_population = 0
        best_year = 1950
        for offset in range(100):
            population += changes[offset]
            if population > best_population:
                best_population = population
                best_year = 1950 + offset
        return best_year
