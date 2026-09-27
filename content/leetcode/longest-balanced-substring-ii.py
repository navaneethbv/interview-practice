class Solution:
    def longestBalanced(self, s):
        pair_best = [
            self._two_letters(s, first, second)
            for first, second in (('a', 'b'), ('a', 'c'), ('b', 'c'))
        ]
        return max(self._longest_run(s), self._three_letters(s), *pair_best)

    def _longest_run(self, s):
        answer = 0
        run = 0
        previous = ''
        for character in s:
            run = run + 1 if character == previous else 1
            previous = character
            answer = max(answer, run)
        return answer

    def _two_letters(self, s, first, second):
        answer = 0
        first_position = {0: -1}
        difference = 0
        for index, character in enumerate(s):
            if character not in (first, second):
                first_position = {0: index}
                difference = 0
                continue
            difference += 1 if character == first else -1
            if difference in first_position:
                answer = max(answer, index - first_position[difference])
            else:
                first_position[difference] = index
        return answer

    def _three_letters(self, s):
        answer = 0
        counts = [0, 0, 0]
        first_position = {(0, 0): -1}
        for index, character in enumerate(s):
            counts[ord(character) - ord('a')] += 1
            key = (counts[0] - counts[1], counts[0] - counts[2])
            if key in first_position:
                answer = max(answer, index - first_position[key])
            else:
                first_position[key] = index
        return answer
