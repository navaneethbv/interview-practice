class ExamRoom {
    private final int capacity;
    private final List<Integer> occupied = new ArrayList<>();

    public ExamRoom(int n) {
        capacity = n;
    }

    public int seat() {
        if (occupied.isEmpty()) {
            occupied.add(0);
            return 0;
        }
        int chosenSeat = 0;
        int bestDistance = occupied.get(0);
        for (int index = 1; index < occupied.size(); index++) {
            int left = occupied.get(index - 1);
            int right = occupied.get(index);
            int distance = (right - left) / 2;
            if (distance > bestDistance) {
                bestDistance = distance;
                chosenSeat = (left + right) / 2;
            }
        }
        int rightDistance = capacity - 1 - occupied.get(occupied.size() - 1);
        if (rightDistance > bestDistance) {
            chosenSeat = capacity - 1;
        }
        int insertion = 0;
        while (insertion < occupied.size() && occupied.get(insertion) < chosenSeat) {
            insertion++;
        }
        occupied.add(insertion, chosenSeat);
        return chosenSeat;
    }

    public void leave(int p) {
        occupied.remove(Integer.valueOf(p));
    }
}
