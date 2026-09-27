class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int[] candidates = selectCandidates(nums);
        int firstCandidate = candidates[0];
        int secondCandidate = candidates[1];
        int firstCount = countOccurrences(nums, firstCandidate);
        int secondCount = countOccurrences(nums, secondCandidate);
        int threshold = nums.length / 3;
        List<Integer> result = new ArrayList<>();
        if (firstCount > threshold) {
            result.add(firstCandidate);
        }
        if (secondCandidate != firstCandidate && secondCount > threshold) {
            result.add(secondCandidate);
        }
        return result;
    }

    private int[] selectCandidates(int[] nums) {
        int firstCandidate = 0;
        int secondCandidate = 1;
        int firstCount = 0;
        int secondCount = 0;
        for (int value : nums) {
            if (value == firstCandidate) {
                firstCount++;
            } else if (value == secondCandidate) {
                secondCount++;
            } else if (firstCount == 0) {
                firstCandidate = value;
                firstCount = 1;
            } else if (secondCount == 0) {
                secondCandidate = value;
                secondCount = 1;
            } else {
                firstCount--;
                secondCount--;
            }
        }
        return new int[]{firstCandidate, secondCandidate};
    }

    private int countOccurrences(int[] nums, int candidate) {
        int count = 0;
        for (int value : nums) {
            if (value == candidate) {
                count++;
            }
        }
        return count;
    }
}
