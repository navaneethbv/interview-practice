class Solution {
public int largestRectangleArea(int[] heights) {
    Deque<int[]> stack=new ArrayDeque<>();int best=0;
    for(int i=0;i<=heights.length;i++) {int h=i==heights.length?0:heights[i],start=i;
        while(!stack.isEmpty()&&stack.peek()[1]>h) {int[] p=stack.pop();start=p[0];best=Math.max(best,p[1]*(i-start));}
        stack.push(new int[]{start,h});
    }
    return best;
}
}
