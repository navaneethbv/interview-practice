class Solution {
public List<Integer> solveQueries(int[] nums,int[] queries){Map<Integer,List<Integer>> p=new HashMap<>();int n=nums.length;int[] d=new int[n];Arrays.fill(d,-1);for(int i=0;i<n;i++)p.computeIfAbsent(nums[i],x->new ArrayList<>()).add(i);for(List<Integer>a:p.values())if(a.size()>1)for(int j=0;j<a.size();j++){int i=a.get(j);d[i]=Math.min((i-a.get((j+a.size()-1)%a.size())+n)%n,(a.get((j+1)%a.size())-i+n)%n);}List<Integer> ans=new ArrayList<>();for(int i:queries)ans.add(d[i]);return ans;}
}
