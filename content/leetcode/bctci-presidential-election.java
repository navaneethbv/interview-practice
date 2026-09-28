class Solution {
    public String solve(String[] candidates, int[] votes) {
        PriorityQueue<Integer> parties = new PriorityQueue<>((a, b) -> {
            int byVotes = Integer.compare(votes[a], votes[b]);
            return byVotes != 0 ? byVotes : candidates[a].compareTo(candidates[b]);
        });
        long total = 0;
        for (int count : votes) {
            total += count;
        }
        for (int i = 0; i < votes.length; i++) {
            if (2L * votes[i] > total) {
                return candidates[i];
            }
            parties.add(i);
        }
        while (parties.size() > 1) {
            int first = parties.remove();
            int second = parties.remove();
            int cutoff = votes[second];
            int mergedVotes = votes[first] + votes[second];
            String leader = votes[first] == cutoff && candidates[first].compareTo(candidates[second]) < 0
                ? candidates[first] : candidates[second];
            while (!parties.isEmpty() && votes[parties.peek()] == cutoff) {
                int next = parties.remove();
                mergedVotes += votes[next];
                if (candidates[next].compareTo(leader) < 0) {
                    leader = candidates[next];
                }
            }
            if (2L * mergedVotes > total) {
                return leader;
            }
            votes[first] = mergedVotes;
            candidates[first] = leader;
            parties.add(first);
        }
        return candidates[parties.peek()];
    }
}
