class Solution:
    def toGoatLatin(self, sentence):
        transformed = []
        for position, word in enumerate(sentence.split(), 1):
            if word[0].lower() not in 'aeiou':
                word = word[1:] + word[0]
            transformed.append(word + 'ma' + 'a' * position)
        return ' '.join(transformed)
