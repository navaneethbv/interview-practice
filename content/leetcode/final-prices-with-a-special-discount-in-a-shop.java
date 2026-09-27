class Solution {
public int[] finalPrices(int[] prices) {int[] result=prices.clone();Deque<Integer> stack=new ArrayDeque<>();for(int i=0;i<prices.length;i++) {while(!stack.isEmpty()&&prices[stack.peek()]>=prices[i]) result[stack.pop()]-=prices[i];stack.push(i);}return result;}
}
