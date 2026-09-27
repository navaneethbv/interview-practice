class Solution {
public int minKnightMoves(int x,int y){x=Math.abs(x);y=Math.abs(y);Deque<int[]>q=new ArrayDeque<>();Set<String>seen=new HashSet<>();q.add(new int[]{0,0,0});seen.add("0,0");int[][]moves={{1,2},{2,1},{-1,2},{-2,1},{1,-2},{2,-1},{-1,-2},{-2,-1}};while(!q.isEmpty()){int[]p=q.remove();if(p[0]==x&&p[1]==y)return p[2];for(int[]d:moves){int a=p[0]+d[0],b=p[1]+d[1];if(a>=-2&&b>=-2&&a<=x+2&&b<=y+2&&seen.add(a+","+b))q.add(new int[]{a,b,p[2]+1});}}return -1;}
}
