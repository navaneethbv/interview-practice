class Solution {
public boolean canReach(int[] arr,int start){boolean[] seen=new boolean[arr.length];ArrayDeque<Integer> q=new ArrayDeque<>();q.add(start);seen[start]=true;while(!q.isEmpty()){int i=q.remove();if(arr[i]==0)return true;for(int j:new int[]{i-arr[i],i+arr[i]})if(j>=0&&j<arr.length&&!seen[j]){seen[j]=true;q.add(j);}}return false;}
}
