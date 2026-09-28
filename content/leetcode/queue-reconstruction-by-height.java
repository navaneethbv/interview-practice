class Solution {
    public int[][] reconstructQueue(int[][] people) {
        Arrays.sort(people, (first, second) -> {
            if (first[0] != second[0]) {
                return Integer.compare(second[0], first[0]);
            }
            return Integer.compare(first[1], second[1]);
        });
        List<int[]> result = new ArrayList<>();
        for (int[] person : people) {
            result.add(person[1], person);
        }
        return result.toArray(new int[0][]);
    }
}
