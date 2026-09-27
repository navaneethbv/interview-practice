class Solution {
public int longestBalanced(String s){int ans=0;for(int i=0;i<s.length();i++){int[] c=new int[26];int distinct=0,largest=0;for(int j=i;j<s.length();j++){int x=s.charAt(j)-'a';if(c[x]++==0)distinct++;largest=Math.max(largest,c[x]);if(largest*distinct==j-i+1)ans=Math.max(ans,j-i+1);}}return ans;}
}
