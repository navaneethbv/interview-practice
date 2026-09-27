class Solution:
    def partition(self, s):
        result = []
        def visit(start, path):
            if start == len(s):
                result.append(path)
            for end in range(start+1, len(s)+1):
                piece = s[start:end]
                if piece == piece[::-1]:
                    visit(end, path+[piece])
        visit(0, [])
        return result
