class Solution {
public long minCost(int[] basket1,int[] basket2){Map<Integer,Integer> d=new HashMap<>();int small=Integer.MAX_VALUE;for(int x:basket1){d.merge(x,1,Integer::sum);small=Math.min(small,x);}for(int x:basket2){d.merge(x,-1,Integer::sum);small=Math.min(small,x);}List<Integer> a=new ArrayList<>();for(var e:d.entrySet()){if(e.getValue()%2!=0)return -1;for(int i=0;i<Math.abs(e.getValue())/2;i++)a.add(e.getKey());}Collections.sort(a);long ans=0;for(int i=0;i<a.size()/2;i++)ans+=Math.min((long)a.get(i),2L*small);return ans;}
}
