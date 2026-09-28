class Solution {
    public List<Integer> survivedRobotsHealths(int[] positions, int[] healths, String directions) {
        Integer[] order = new Integer[positions.length];
        for (int index = 0; index < positions.length; index++) {
            order[index] = index;
        }
        Arrays.sort(order, (first, second) -> Integer.compare(positions[first], positions[second]));
        Deque<Integer> rightMoving = new ArrayDeque<>();
        for (int index : order) {
            if (directions.charAt(index) == 'R') {
                rightMoving.push(index);
                continue;
            }
            resolveCollision(index, healths, rightMoving);
        }
        List<Integer> survivors = new ArrayList<>();
        for (int health : healths) {
            if (health > 0) {
                survivors.add(health);
            }
        }
        return survivors;
    }

    private void resolveCollision(int leftMoving, int[] healths, Deque<Integer> rightMoving) {
        while (!rightMoving.isEmpty() && healths[leftMoving] > 0) {
            int other = rightMoving.peek();
            if (healths[other] < healths[leftMoving]) {
                healths[leftMoving]--;
                healths[other] = 0;
                rightMoving.pop();
            } else if (healths[other] > healths[leftMoving]) {
                healths[other]--;
                healths[leftMoving] = 0;
            } else {
                healths[other] = 0;
                healths[leftMoving] = 0;
                rightMoving.pop();
            }
        }
    }
}
