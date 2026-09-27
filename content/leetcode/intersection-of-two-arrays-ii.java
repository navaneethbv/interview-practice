class Solution {
public int[] intersect(int[] nums1,int[] nums2){Map<Integer,Integer>count=new HashMap<>();for(int x:nums1)count.merge(x,1,Integer::sum);List<Integer>out=new ArrayList<>();for(int x:nums2)if(count.getOrDefault(x,0)>0){out.add(x);count.put(x,count.get(x)-1);}return out.stream().mapToInt(Integer::intValue).toArray();}
}
