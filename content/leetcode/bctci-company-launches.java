class Solution {
    public List<Integer> solve(int[] launches, int[] ads) {
        Integer[] order = new Integer[launches.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, Comparator.comparingInt(i -> launches[i]));
        int maximum = -1;
        int second = -1;
        List<Integer> answer = new ArrayList<>();
        for (int index : order) {
            int value = ads[index];
            if (second < value && value < maximum) {
                answer.add(index);
            }
            if (value > maximum) {
                second = maximum;
                maximum = value;
            } else if (value > second) {
                second = value;
            }
        }
        Collections.sort(answer);
        return answer;
    }
}
