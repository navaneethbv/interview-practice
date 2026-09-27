class Solution:
    def fullJustify(self, words, maxWidth):
        lines = []
        start = 0

        while start < len(words):
            end = start
            letter_count = 0
            while (end < len(words)
                   and letter_count + len(words[end]) + end - start <= maxWidth):
                letter_count += len(words[end])
                end += 1

            word_count = end - start
            if end == len(words) or word_count == 1:
                line = " ".join(words[start:end]).ljust(maxWidth)
            else:
                total_spaces = maxWidth - letter_count
                base_spaces, extra_spaces = divmod(total_spaces, word_count - 1)
                pieces = []
                for offset in range(word_count):
                    pieces.append(words[start + offset])
                    if offset < word_count - 1:
                        spaces = base_spaces + (offset < extra_spaces)
                        pieces.append(" " * spaces)
                line = "".join(pieces)

            lines.append(line)
            start = end

        return lines
