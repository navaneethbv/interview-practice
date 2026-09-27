class Solution {
public int[] findDiagonalOrder(List<List<Integer>> nums){TreeMap<Integer,List<Integer>>diags=new TreeMap<>();int count=0;for(int r=0;r<nums.size();r++)for(int c=0;c<nums.get(r).size();c++){diags.computeIfAbsent(r+c,x->new ArrayList<>()).add(nums.get(r).get(c));count++;}int[]out=new int[count];int i=0;for(List<Integer>d:diags.values())for(int j=d.size()-1;j>=0;j--)out[i++]=d.get(j);return out;}
}
