class Solution {
public boolean equationsPossible(String[] equations){int[]p=new int[26];for(int i=0;i<26;i++)p[i]=i;for(String e:equations)if(e.charAt(1)=='=')p[find(p,e.charAt(0)-'a')]=find(p,e.charAt(3)-'a');for(String e:equations)if(e.charAt(1)=='!'&&find(p,e.charAt(0)-'a')==find(p,e.charAt(3)-'a'))return false;return true;}private int find(int[]p,int x){while(p[x]!=x){p[x]=p[p[x]];x=p[x];}return x;}
}
