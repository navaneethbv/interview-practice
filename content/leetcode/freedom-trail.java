class Solution {
    public int findRotateSteps(String ring, String key) {
        List<Integer>[] positions = new List[26];
        for (int index = 0; index < 26; index++) {
            positions[index] = new ArrayList<>();
        }
        for (int index = 0; index < ring.length(); index++) {
            positions[ring.charAt(index) - 'a'].add(index);
        }

        Map<Integer, Integer> costs = new HashMap<>();
        costs.put(0, 0);
        for (int keyIndex = 0; keyIndex < key.length(); keyIndex++) {
            List<Integer> nextPositions = positions[key.charAt(keyIndex) - 'a'];
            Map<Integer, Integer> nextCosts = new HashMap<>();
            for (int nextPosition : nextPositions) {
                int best = Integer.MAX_VALUE;
                for (Map.Entry<Integer, Integer> entry : costs.entrySet()) {
                    int distance = Math.abs(entry.getKey() - nextPosition);
                    int rotation = Math.min(distance, ring.length() - distance);
                    best = Math.min(best, entry.getValue() + rotation + 1);
                }
                nextCosts.put(nextPosition, best);
            }
            costs = nextCosts;
        }

        int answer = Integer.MAX_VALUE;
        for (int cost : costs.values()) {
            answer = Math.min(answer, cost);
        }
        return answer;
    }
}
