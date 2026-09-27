class Solution {
public int[] intersection(int[] nums1,int[] nums2) {Set<Integer> a=new HashSet<>(),out=new HashSet<>();for(int n:nums1) a.add(n);for(int n:nums2) if(a.contains(n)) out.add(n);return out.stream().mapToInt(Integer::intValue).toArray();}
}
