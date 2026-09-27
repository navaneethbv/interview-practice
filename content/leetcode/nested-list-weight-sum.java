class Solution {
    public int depthSum(List<NestedInteger> nestedList) { return sum(nestedList,1); }
    private int sum(List<NestedInteger> items,int depth) {
        int total=0;for(NestedInteger item:items)total+=item.isInteger()?item.getInteger()*depth:sum(item.getList(),depth+1);return total;
    }
}
