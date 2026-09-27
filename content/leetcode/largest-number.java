class Solution {
    public String largestNumber(int[] nums) {
        String[] values = new String[nums.length];
        for (int index = 0; index < nums.length; index++) {
            values[index] = String.valueOf(nums[index]);
        }
        Arrays.sort(values, (first, second) -> (second + first).compareTo(first + second));
        if (values[0].equals("0")) {
            return "0";
        }
        return String.join("", values);
    }
}
