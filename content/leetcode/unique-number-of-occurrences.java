class Solution {
public boolean uniqueOccurrences(int[] arr){Map<Integer,Integer>counts=new HashMap<>();for(int x:arr)counts.merge(x,1,Integer::sum);return new HashSet<>(counts.values()).size()==counts.size();}
}
