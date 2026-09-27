class Solution {
public int sumSubarrayMins(int[] arr){Deque<Integer>stack=new ArrayDeque<>();long total=0;for(int r=0;r<=arr.length;r++){while(!stack.isEmpty()&&(r==arr.length||arr[stack.peek()]>=arr[r])){int m=stack.pop(),l=stack.isEmpty()?-1:stack.peek();total=(total+(long)arr[m]*(m-l)*(r-m))%1000000007;}stack.push(r);}return (int)total;}
}
