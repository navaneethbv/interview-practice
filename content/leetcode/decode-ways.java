class Solution {
public int numDecodings(String s){int older=1,prev=s.charAt(0)=='0'?0:1;for(int i=1;i<s.length();i++){int cur=s.charAt(i)=='0'?0:prev;int pair=(s.charAt(i-1)-'0')*10+s.charAt(i)-'0';if(pair>=10&&pair<=26)cur+=older;older=prev;prev=cur;}return prev;}
}
