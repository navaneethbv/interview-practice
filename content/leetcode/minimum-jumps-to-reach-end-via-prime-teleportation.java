class Solution {
    public int minJumps(int[] nums) {
        int[] factors = smallestPrimeFactors(maximum(nums));
        Map<Integer, List<Integer>> buckets = buildBuckets(nums, factors);
        int[] distance = new int[nums.length];
        Arrays.fill(distance, -1);
        distance[0] = 0;
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int index = queue.remove();
            if (index == nums.length - 1) {
                return distance[index];
            }
            visitNeighbors(nums, factors, buckets, distance, queue, index);
        }
        return -1;
    }
    private void visitNeighbors(int[] nums, int[] factors,
    Map<Integer, List<Integer>> buckets, int[] distance,
    ArrayDeque<Integer> queue, int index) {
        addNeighbor(index - 1, distance, queue, distance[index]);
        addNeighbor(index + 1, distance, queue, distance[index]);
        int value = nums[index];
        if (value > 1 && factors[value] == value) {
            List<Integer> neighbors = buckets.remove(value);
            if (neighbors != null) {
                for (int neighbor : neighbors) {
                    addNeighbor(neighbor, distance, queue, distance[index]);
                }
            }
        }
    }
    private void addNeighbor(int neighbor, int[] distance, ArrayDeque<Integer> queue,
    int nextDistance) {
        if (neighbor >= 0 && neighbor < distance.length && distance[neighbor] < 0) {
            distance[neighbor] = nextDistance + 1;
            queue.add(neighbor);
        }
    }
    private int maximum(int[] values) {
        int answer = 0;
        for (int value : values) {
            answer = Math.max(answer, value);
        }
        return answer;
    }
    private int[] smallestPrimeFactors(int maximum) {
        int[] factors = new int[maximum + 1];
        for (int value = 0; value <= maximum; value++) {
            factors[value] = value;
        }
        for (int prime = 2; prime * prime <= maximum; prime++) {
            if (factors[prime] != prime) {
                continue;
            }
            for (int value = prime * prime; value <= maximum; value += prime) {
                if (factors[value] == value) {
                    factors[value] = prime;
                }
            }
        }
        return factors;
    }
    private Map<Integer, List<Integer>> buildBuckets(int[] nums, int[] factors) {
        Map<Integer, List<Integer>> buckets = new HashMap<>();
        for (int index = 0; index < nums.length; index++) {
            int value = nums[index];
            while (value > 1) {
                int prime = factors[value];
                buckets.computeIfAbsent(prime, key -> new ArrayList<>()).add(index);
                while (value % prime == 0) {
                    value /= prime;
                }
            }
        }
        return buckets;
    }
}
