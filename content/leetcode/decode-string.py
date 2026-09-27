class Solution:
    def decodeString(self, s):
        frames = []
        current_text = []
        repeat_count = 0
        for character in s:
            if character.isdigit():
                repeat_count = repeat_count * 10 + int(character)
            elif character == "[":
                frames.append((current_text, repeat_count))
                current_text = []
                repeat_count = 0
            elif character == "]":
                previous_text, count = frames.pop()
                current_text = previous_text + current_text * count
            else:
                current_text.append(character)
        return "".join(current_text)
