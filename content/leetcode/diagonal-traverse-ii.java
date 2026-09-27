class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        TreeMap<Integer, List<Integer>> diagonals = new TreeMap<>();
        int count = 0;
        for (int row = 0; row < nums.size(); row++) {
            for (int column = 0; column < nums.get(row).size(); column++) {
                diagonals.computeIfAbsent(row + column, key -> new ArrayList<>())
                        .add(nums.get(row).get(column));
                count++;
            }
        }
        int[] result = new int[count];
        int index = 0;
        for (List<Integer> diagonal : diagonals.values()) {
            for (int position = diagonal.size() - 1; position >= 0; position--) {
                result[index++] = diagonal.get(position);
            }
        }
        return result;
    }
}
