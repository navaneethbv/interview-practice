class Solution {
public List<String> topKFrequent(String[] words,int k){Map<String,Integer>counts=new HashMap<>();for(String w:words)counts.merge(w,1,Integer::sum);List<String>out=new ArrayList<>(counts.keySet());out.sort((a,b)->counts.get(a).equals(counts.get(b))?a.compareTo(b):Integer.compare(counts.get(b),counts.get(a)));return new ArrayList<>(out.subList(0,k));}
}
