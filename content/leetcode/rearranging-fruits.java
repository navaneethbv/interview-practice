class Solution {
    public long minCost(int[] basket1, int[] basket2) {
        Map<Integer, Integer> difference = new HashMap<>();
        int cheapest = Integer.MAX_VALUE;
        for (int value : basket1) {
            difference.merge(value, 1, Integer::sum);
            cheapest = Math.min(cheapest, value);
        }
        for (int value : basket2) {
            difference.merge(value, -1, Integer::sum);
            cheapest = Math.min(cheapest, value);
        }
        List<Integer> extra = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : difference.entrySet()) {
            if (entry.getValue() % 2 != 0) {
                return -1;
            }
            for (int count = 0; count < Math.abs(entry.getValue()) / 2; count++) {
                extra.add(entry.getKey());
            }
        }
        Collections.sort(extra);
        long answer = 0;
        for (int index = 0; index < extra.size() / 2; index++) {
            answer += Math.min((long) extra.get(index), 2L * cheapest);
        }
        return answer;
    }
}
