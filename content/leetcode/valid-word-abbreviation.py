class Solution:
    def validWordAbbreviation(self, word, abbr):
        word_index = 0
        abbreviation_index = 0

        while abbreviation_index < len(abbr):
            character = abbr[abbreviation_index]
            if character == "0":
                return False

            if character.isdigit():
                skipped, abbreviation_index = self._read_number(
                    abbr,
                    abbreviation_index,
                )
                word_index += skipped
            else:
                if word_index >= len(word) or word[word_index] != character:
                    return False
                word_index += 1
                abbreviation_index += 1

            if word_index > len(word):
                return False

        return word_index == len(word)

    @staticmethod
    def _read_number(abbr, start):
        count = 0
        index = start
        while index < len(abbr) and abbr[index].isdigit():
            count = count * 10 + int(abbr[index])
            index += 1
        return count, index
