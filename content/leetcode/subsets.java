class Solution {
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result=new ArrayList<>();result.add(new ArrayList<>());
    for(int n:nums) {int size=result.size();for(int i=0;i<size;i++) {List<Integer> next=new ArrayList<>(result.get(i));next.add(n);result.add(next);}}
    return result;
}
}
