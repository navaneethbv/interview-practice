class Solution:
    def palindromePairs(self, words):
        word_index = {
            word: index for index, word in enumerate(words)
        }
        pairs = set()
        for word_index_in_list, word in enumerate(words):
            for split in range(len(word) + 1):
                left = word[:split]
                right = word[split:]
                # A palindrome on one side determines the needed reverse on the other.
                if left == left[::-1]:
                    self._record(pairs, word_index.get(right[::-1]),
                                 word_index_in_list, True)
                if right == right[::-1]:
                    self._record(pairs, word_index.get(left[::-1]),
                                 word_index_in_list, False)
        return [list(pair) for pair in sorted(pairs)]

    @staticmethod
    def _record(pairs, other_index, current_index, other_first):
        if other_index is not None and other_index != current_index:
            if other_first:
                pairs.add((other_index, current_index))
            else:
                pairs.add((current_index, other_index))
