class Solution {
public List<List<String>> partition(String s){List<List<String>> out=new ArrayList<>();go(s,0,new ArrayList<>(),out);return out;} private void go(String s,int start,List<String> p,List<List<String>> out){if(start==s.length()){out.add(new ArrayList<>(p));return;}for(int e=start+1;e<=s.length();e++){boolean ok=true;for(int l=start,r=e-1;l<r;l++,r--)if(s.charAt(l)!=s.charAt(r)){ok=false;break;}if(ok){p.add(s.substring(start,e));go(s,e,p,out);p.remove(p.size()-1);}}}
}
