class Solution:
    def hanoi(self, n):
        moves = []
        self._move(n, 1, 3, 2, moves)
        return moves

    def _move(self, disks, source, target, spare, moves):
        if disks == 0:
            return
        self._move(disks - 1, source, spare, target, moves)
        moves.append([source, target])
        self._move(disks - 1, spare, target, source, moves)
