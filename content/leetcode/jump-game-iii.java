class Solution {
    public boolean canReach(int[] arr, int start) {
        boolean[] seen = new boolean[arr.length];
        Deque<Integer> pending = new ArrayDeque<>();
        pending.add(start);
        seen[start] = true;
        while (!pending.isEmpty()) {
            int index = pending.remove();
            if (arr[index] == 0) {
                return true;
            }
            int[] destinations = {index - arr[index], index + arr[index]};
            for (int destination : destinations) {
                if (destination >= 0 && destination < arr.length && !seen[destination]) {
                    seen[destination] = true;
                    pending.add(destination);
                }
            }
        }
        return false;
    }
}
