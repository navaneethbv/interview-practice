class Solution {
public int leastInterval(char[] tasks,int n) {
    int[] counts=new int[26];for(char c:tasks) counts[c-'A']++;int maximum=Arrays.stream(counts).max().getAsInt(),tied=0;for(int count:counts) if(count==maximum) tied++;
    return Math.max(tasks.length,(maximum-1)*(n+1)+tied);
}
}
