class Solution {
public int minFlips(String s){int n=s.length(),bad=0,best=n;for(int i=0;i<2*n;i++){if(s.charAt(i%n)-'0'!=i%2)bad++;if(i>=n&&s.charAt(i-n)-'0'!=(i-n)%2)bad--;if(i>=n-1)best=Math.min(best,Math.min(bad,n-bad));}return best;}
}
