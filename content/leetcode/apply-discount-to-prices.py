class Solution:
    def discountPrices(self, sentence, discount):
        words = sentence.split(' ')
        for index, word in enumerate(words):
            if self._is_price(word):
                cents = int(word[1:]) * (100 - discount)
                words[index] = '$' + str(cents // 100) + '.' + str(cents % 100).zfill(2)
        return ' '.join(words)

    def _is_price(self, word):
        return len(word) > 1 and word[0] == '$' and word[1:].isdigit()
