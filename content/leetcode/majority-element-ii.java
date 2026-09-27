class Solution {
    public List<Integer> majorityElement(int[] nums) {
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

        firstCount = 0;
        secondCount = 0;
        for (int value : nums) {
            if (value == firstCandidate) {
                firstCount++;
            }
            if (value == secondCandidate) {
                secondCount++;
            }
        }

        List<Integer> result = new ArrayList<>();
        if (firstCount > nums.length / 3) {
            result.add(firstCandidate);
        }
        if (secondCandidate != firstCandidate
                && secondCount > nums.length / 3) {
            result.add(secondCandidate);
        }
        return result;
    }
}
