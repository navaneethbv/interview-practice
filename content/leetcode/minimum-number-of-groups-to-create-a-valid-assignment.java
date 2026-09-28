class Solution {
    public int minGroupsForValidAssignment(int[] balls) {
        Map<Integer, Integer> frequencies = new HashMap<>();
        for (int value : balls) {
            frequencies.merge(value, 1, Integer::sum);
        }
        int smallestFrequency = Collections.min(frequencies.values());
        for (int smallerSize = smallestFrequency; smallerSize >= 1; smallerSize--) {
            int groupCount = 0;
            boolean valid = true;
            for (int frequency : frequencies.values()) {
                int groups = (frequency + smallerSize) / (smallerSize + 1);
                if (groups * smallerSize > frequency) {
                    valid = false;
                    break;
                }
                groupCount += groups;
            }
            if (valid) {
                return groupCount;
            }
        }
        return balls.length;
    }
}
