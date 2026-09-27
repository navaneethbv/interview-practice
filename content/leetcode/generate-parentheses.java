class Solution {
private void build(int n,int open,int close,String prefix,List<String> out) {
    if(close==n) {out.add(prefix);return;}
    if(open<n) build(n,open+1,close,prefix+"(",out);
    if(close<open) build(n,open,close+1,prefix+")",out);
}
public List<String> generateParenthesis(int n) {List<String> out=new ArrayList<>();build(n,0,0,"",out);return out;}
}
