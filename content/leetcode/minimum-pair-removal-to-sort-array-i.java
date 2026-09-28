class Solution {
    public int minimumPairRemoval(int[] nums) {
        List<Integer> values = new ArrayList<>();
        for (int value : nums) {
            values.add(value);
        }
        int operations = 0;
        while (!isNondecreasing(values)) {
            int bestIndex = findSmallestPair(values);
            values.set(bestIndex, values.get(bestIndex) + values.get(bestIndex + 1));
            values.remove(bestIndex + 1);
            operations++;
        }
        return operations;
    }

    private boolean isNondecreasing(List<Integer> values) {
        for (int index = 1; index < values.size(); index++) {
            if (values.get(index - 1) > values.get(index)) {
                return false;
            }
        }
        return true;
    }

    private int findSmallestPair(List<Integer> values) {
        int bestIndex = 0;
        for (int index = 1; index + 1 < values.size(); index++) {
            int currentSum = values.get(index) + values.get(index + 1);
            int bestSum = values.get(bestIndex) + values.get(bestIndex + 1);
            if (currentSum < bestSum) {
                bestIndex = index;
            }
        }
        return bestIndex;
    }
}
