class Solution:
    def estimate(self, solution, guess):
        hits = 0
        unmatched = {}
        for actual, guessed in zip(solution, guess):
            if actual == guessed:
                hits += 1
            else:
                unmatched[actual] = unmatched.get(actual, 0) + 1
        pseudo_hits = 0
        for actual, guessed in zip(solution, guess):
            if actual != guessed and unmatched.get(guessed, 0) > 0:
                unmatched[guessed] -= 1
                pseudo_hits += 1
        return [hits, pseudo_hits]
