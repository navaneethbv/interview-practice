class Solution:
    def totalNQueens(self, n):
        mask = (1 << n) - 1
        return self._search(mask, 0, 0, 0)

    def _search(self, mask, columns, left_diagonals, right_diagonals):
        if columns == mask:
            return 1
        choices = mask & ~(columns | left_diagonals | right_diagonals)
        total = 0
        while choices:
            bit = choices & -choices
            choices -= bit
            total += self._search(
                mask,
                columns | bit,
                ((left_diagonals | bit) << 1) & mask,
                (right_diagonals | bit) >> 1,
            )
        return total
