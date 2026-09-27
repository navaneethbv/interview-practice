class Codec:
    def encode(self, strs):
        return ''.join(str(len(word)) + '#' + word for word in strs)

    def decode(self, s):
        result = []
        position = 0
        while position < len(s):
            separator = s.index('#', position)
            length = int(s[position:separator])
            position = separator + 1
            result.append(s[position:position + length])
            position += length
        return result
