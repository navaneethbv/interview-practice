class Solution {
public int takeCharacters(String s,int k){int[]remaining=new int[3];for(char c:s.toCharArray())remaining[c-'a']++;for(int n:remaining)if(n<k)return -1;int left=0,best=0;for(int right=0;right<s.length();right++){int c=s.charAt(right)-'a';remaining[c]--;while(remaining[c]<k)remaining[s.charAt(left++)-'a']++;best=Math.max(best,right-left+1);}return s.length()-best;}
}
