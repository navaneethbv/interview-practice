class Solution {
public List<List<Integer>> kSmallestPairs(int[] nums1,int[] nums2,int k){PriorityQueue<int[]>q=new PriorityQueue<>((a,b)->Long.compare((long)nums1[a[0]]+nums2[a[1]],(long)nums1[b[0]]+nums2[b[1]]));for(int i=0;i<Math.min(k,nums1.length);i++)q.add(new int[]{i,0});List<List<Integer>>out=new ArrayList<>();while(!q.isEmpty()&&out.size()<k){int[]p=q.remove();out.add(Arrays.asList(nums1[p[0]],nums2[p[1]]));if(p[1]+1<nums2.length)q.add(new int[]{p[0],p[1]+1});}return out;}
}
