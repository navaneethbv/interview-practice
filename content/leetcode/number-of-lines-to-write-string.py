class Solution:
    def numberOfLines(self, widths, s):
        lines, width = 1, 0
        for ch in s:
            w = widths[ord(ch) - ord("a")]
            if width + w > 100:
                lines += 1
                width = 0
            width += w
        return [lines, width]
