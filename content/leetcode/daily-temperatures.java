class Solution {
public int[] dailyTemperatures(int[] temperatures) {
    Deque<Integer> stack=new ArrayDeque<>();int[] result=new int[temperatures.length];
    for(int i=0;i<temperatures.length;i++) {while(!stack.isEmpty()&&temperatures[stack.peek()]<temperatures[i]) {int previous=stack.pop();result[previous]=i-previous;}stack.push(i);}
    return result;
}
}
