class Solution {
public int minGroupsForValidAssignment(int[] balls) {Map<Integer,Integer> counts=new HashMap<>();for(int n:balls) counts.merge(n,1,Integer::sum);int minimum=Collections.min(counts.values());for(int small=minimum;small>=1;small--) {int total=0;boolean valid=true;for(int count:counts.values()) {int groups=(count+small)/(small+1);if(groups*small>count) {valid=false;break;}total+=groups;}if(valid) return total;}return balls.length;}
}
