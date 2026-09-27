class Solution {
public int pathSum(TreeNode root,int targetSum){Map<Long,Integer>counts=new HashMap<>();counts.put(0L,1);return go(root,0L,targetSum,counts);}private int go(TreeNode n,long sum,int target,Map<Long,Integer>counts){if(n==null)return 0;sum+=n.val;int out=counts.getOrDefault(sum-target,0);counts.merge(sum,1,Integer::sum);out+=go(n.left,sum,target,counts)+go(n.right,sum,target,counts);counts.put(sum,counts.get(sum)-1);return out;}
}
