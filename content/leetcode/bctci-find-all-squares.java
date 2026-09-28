class Solution {
    public List<List<Integer>> findSquares(int[] arr) {
        Map<Long, Integer> position = new HashMap<>();
        for (int index = 0; index < arr.length; index++) {
            position.put((long) arr[index], index);
        }
        List<List<Integer>> pairs = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            Integer j = position.get((long) arr[i] * arr[i]);
            if (j != null) {
                pairs.add(List.of(i, j));
            }
        }
        return pairs;
    }
}
