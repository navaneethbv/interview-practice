class Solution {
public long numberOfWeeks(int[] milestones){long total=0,largest=0;for(int x:milestones){total+=x;largest=Math.max(largest,x);}return Math.min(total,2*(total-largest)+1);}
}
