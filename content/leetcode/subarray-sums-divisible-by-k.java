class Solution {
public int subarraysDivByK(int[] nums, int k) {
    int[] remainderCounts = new int[k];
    remainderCounts[0] = 1;
    int remainder = 0;
    int total = 0;
    for (int value : nums) {
        remainder = Math.floorMod(remainder + value, k);
        total += remainderCounts[remainder];
        remainderCounts[remainder]++;
    }
    return total;
}
}
