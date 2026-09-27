class Solution {
public List<List<String>> solveNQueens(int n){List<List<String>> out=new ArrayList<>();go(n,new boolean[n],new boolean[2*n],new boolean[2*n],new ArrayList<>(),out);return out;}private void go(int n,boolean[] c,boolean[] d,boolean[] u,List<String> p,List<List<String>> out){int r=p.size();if(r==n){out.add(new ArrayList<>(p));return;}for(int x=0;x<n;x++)if(!c[x]&&!d[r-x+n]&&!u[r+x]){c[x]=d[r-x+n]=u[r+x]=true;char[] row=new char[n];Arrays.fill(row,'.');row[x]='Q';p.add(new String(row));go(n,c,d,u,p,out);p.remove(p.size()-1);c[x]=d[r-x+n]=u[r+x]=false;}}
}
