class Solution {
public int findMaximizedCapital(int k,int w,int[] profits,int[] capital){int[][]p=new int[profits.length][2];for(int i=0;i<p.length;i++)p[i]=new int[]{capital[i],profits[i]};Arrays.sort(p,Comparator.comparingInt(a->a[0]));PriorityQueue<Integer>q=new PriorityQueue<>(Collections.reverseOrder());int i=0;while(k-->0){while(i<p.length&&p[i][0]<=w)q.add(p[i++][1]);if(q.isEmpty())break;w+=q.remove();}return w;}
}
