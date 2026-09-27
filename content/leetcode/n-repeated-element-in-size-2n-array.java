class Solution {
public int repeatedNTimes(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int value : nums) {
        if (!seen.add(value)) {
            return value;
        }
    }
    throw new IllegalStateException();
}
}
