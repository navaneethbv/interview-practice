class Solution {
private void search(int[] candidates,int start,int remaining,List<Integer> path,List<List<Integer>> result) {
    if(remaining==0) {result.add(new ArrayList<>(path));return;}
    for(int i=start;i<candidates.length&&candidates[i]<=remaining;i++) {if(i>start&&candidates[i]==candidates[i-1]) continue;path.add(candidates[i]);search(candidates,i+1,remaining-candidates[i],path,result);path.remove(path.size()-1);}
}
public List<List<Integer>> combinationSum2(int[] candidates,int target) {Arrays.sort(candidates);List<List<Integer>> result=new ArrayList<>();search(candidates,0,target,new ArrayList<>(),result);return result;}
}
