class Solution {
public int[] smallestRange(List<List<Integer>> nums){PriorityQueue<int[]>q=new PriorityQueue<>(Comparator.comparingInt(a->a[0]));int high=Integer.MIN_VALUE;for(int i=0;i<nums.size();i++){int v=nums.get(i).get(0);q.add(new int[]{v,i,0});high=Math.max(high,v);}int lo=q.peek()[0],hi=high;while(true){int[]p=q.remove();int low=p[0];if(high-low<hi-lo||(high-low==hi-lo&&low<lo)){lo=low;hi=high;}if(p[2]+1==nums.get(p[1]).size())break;int v=nums.get(p[1]).get(p[2]+1);high=Math.max(high,v);q.add(new int[]{v,p[1],p[2]+1});}return new int[]{lo,hi};}
}
