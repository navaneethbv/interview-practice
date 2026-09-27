class Solution {
public int minimumPairRemoval(int[] nums) {List<Integer> values=new ArrayList<>();for(int n:nums) values.add(n);int operations=0;while(true) {boolean sorted=true;for(int i=1;i<values.size();i++) if(values.get(i-1)>values.get(i)) sorted=false;if(sorted) return operations;int best=0;for(int i=1;i+1<values.size();i++) if(values.get(i)+values.get(i+1)<values.get(best)+values.get(best+1)) best=i;values.set(best,values.get(best)+values.get(best+1));values.remove(best+1);operations++;}}
}
