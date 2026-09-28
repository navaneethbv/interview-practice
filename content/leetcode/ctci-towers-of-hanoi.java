class Solution {
    public List<List<Integer>> hanoi(int n) {
        List<List<Integer>> moves = new ArrayList<>();
        move(n, 1, 3, 2, moves);
        return moves;
    }

    private void move(int disks, int source, int target, int spare, List<List<Integer>> moves) {
        if (disks == 0) {
            return;
        }
        move(disks - 1, source, spare, target, moves);
        moves.add(List.of(source, target));
        move(disks - 1, spare, target, source, moves);
    }
}
