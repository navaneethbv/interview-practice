class Solution {
    public long nestedSum(List<NestedInteger> arr) {
        long total = 0;
        for (NestedInteger item : arr) {
            total += item.isInteger() ? item.getInteger() : nestedSum(item.getList());
        }
        return total;
    }
}
