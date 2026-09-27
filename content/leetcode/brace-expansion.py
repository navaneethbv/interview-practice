class Solution:
    def expand(self, s):
        groups = []
        index = 0
        while index < len(s):
            if s[index] == '{':
                end = s.index('}', index)
                groups.append(sorted(s[index + 1:end].split(',')))
                index = end + 1
            else:
                groups.append([s[index]])
                index += 1

        result = []
        path = []

        def generate(group_index):
            if group_index == len(groups):
                result.append(''.join(path))
                return
            for letter in groups[group_index]:
                path.append(letter)
                generate(group_index + 1)
                path.pop()

        generate(0)
        return result
