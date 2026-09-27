class Solution {
public String reorganizeString(String s){int[]count=new int[26];for(char c:s.toCharArray())count[c-'a']++;PriorityQueue<int[]>q=new PriorityQueue<>((a,b)->Integer.compare(b[1],a[1]));for(int i=0;i<26;i++)if(count[i]>0)q.add(new int[]{i,count[i]});int[]previous=null;StringBuilder out=new StringBuilder();while(!q.isEmpty()){int[]p=q.remove();out.append((char)('a'+p[0]));p[1]--;if(previous!=null&&previous[1]>0)q.add(previous);previous=p;}return out.length()==s.length()?out.toString():"";}
}
