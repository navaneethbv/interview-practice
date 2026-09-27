class Solution {
    public void wallsAndGates(int[][] rooms) {
        if (rooms.length == 0 || rooms[0].length == 0) {
            return;
        }

        Deque<int[]> queue = new ArrayDeque<>();
        for (int row = 0; row < rooms.length; row++) {
            for (int column = 0; column < rooms[0].length; column++) {
                if (rooms[row][column] == 0) {
                    queue.add(new int[]{row, column});
                }
            }
        }

        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            int row = cell[0];
            int column = cell[1];
            int distance = rooms[row][column];

            addRoom(queue, rooms, row - 1, column, distance);
            addRoom(queue, rooms, row + 1, column, distance);
            addRoom(queue, rooms, row, column - 1, distance);
            addRoom(queue, rooms, row, column + 1, distance);
        }
    }

    private void addRoom(
            Deque<int[]> queue,
            int[][] rooms,
            int row,
            int column,
            int distance) {
        if (row >= 0
                && row < rooms.length
                && column >= 0
                && column < rooms[0].length
                && rooms[row][column] == Integer.MAX_VALUE) {
            rooms[row][column] = distance + 1;
            queue.add(new int[]{row, column});
        }
    }
}
