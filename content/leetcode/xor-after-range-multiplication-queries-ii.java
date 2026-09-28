class Solution {
    private static final long MODULUS = 1000000007L;

    public int xorAfterQueries(int[] nums, int[][] queries) {
        int threshold = (int) Math.sqrt(nums.length) + 1;
        Map<Integer, List<int[]>> grouped = new HashMap<>();
        for (int[] query : queries) {
            if (query[2] > threshold) {
                applyDirect(nums, query, threshold);
            } else {
                grouped.computeIfAbsent(query[2], key -> new ArrayList<>()).add(query);
            }
        }
        for (Map.Entry<Integer, List<int[]>> entry : grouped.entrySet()) {
            applyGroup(nums, entry.getKey(), entry.getValue());
        }
        int answer = 0;
        for (int value : nums) {
            answer ^= value;
        }
        return answer;
    }

    private void applyDirect(int[] nums, int[] query, int unusedThreshold) {
        int left = query[0];
        int right = query[1];
        int step = query[2];
        long multiplier = query[3];
        for (int index = left; index <= right; index += step) {
            nums[index] = (int) (nums[index] * multiplier % MODULUS);
        }
    }

    private void applyGroup(int[] nums, int step, List<int[]> queries) {
        long[] factors = new long[nums.length + step];
        Arrays.fill(factors, 1);
        for (int[] query : queries) {
            int left = query[0];
            int end = left + ((query[1] - left) / step + 1) * step;
            long multiplier = query[3];
            factors[left] = factors[left] * multiplier % MODULUS;
            factors[end] = factors[end] * modularPower(multiplier, MODULUS - 2) % MODULUS;
        }
        for (int index = 0; index < nums.length; index++) {
            if (index >= step) {
                factors[index] = factors[index] * factors[index - step] % MODULUS;
            }
            nums[index] = (int) (nums[index] * factors[index] % MODULUS);
        }
    }

    private long modularPower(long base, long exponent) {
        long result = 1;
        while (exponent > 0) {
            if ((exponent & 1) != 0) {
                result = result * base % MODULUS;
            }
            base = base * base % MODULUS;
            exponent >>= 1;
        }
        return result;
    }
}
