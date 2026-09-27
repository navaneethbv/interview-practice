class Solution:
    def restoreIpAddresses(self, s):
        addresses = []
        def visit(start, parts):
            if len(parts) == 4:
                if start == len(s):
                    addresses.append('.'.join(parts))
                return
            remaining_parts = 4 - len(parts)
            characters_left = len(s) - start
            if not remaining_parts <= characters_left <= 3 * remaining_parts:
                return
            for size in range(1, 4):
                piece = s[start:start + size]
                if len(piece) != size:
                    continue
                if size > 1 and piece[0] == '0':
                    continue
                if int(piece) > 255:
                    continue
                parts.append(piece)
                visit(start + size, parts)
                parts.pop()
        visit(0, [])
        return addresses
