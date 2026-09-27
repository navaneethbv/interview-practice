class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> values=new HashSet<>();for(int n:nums) values.add(n);int best=0;
        for(int x:values) if(!values.contains(x-1)) {int end=x;while(values.contains(end)) end++;best=Math.max(best,end-x);}
        return best;
    }
}
