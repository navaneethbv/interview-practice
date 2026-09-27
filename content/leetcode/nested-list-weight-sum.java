class Solution {
    public int depthSum(List<NestedInteger> nestedList) {
        return sumAtDepth(nestedList, 1);
    }

    private int sumAtDepth(List<NestedInteger> items, int depth) {
        int total = 0;
        for (NestedInteger item : items) {
            if (item.isInteger()) {
                total += item.getInteger() * depth;
            } else {
                total += sumAtDepth(item.getList(), depth + 1);
            }
        }
        return total;
    }
}
