class Solution {
public int minDistance(String word1,String word2){int[]prev=new int[word2.length()+1];for(int j=0;j<prev.length;j++)prev[j]=j;for(int i=1;i<=word1.length();i++){int[]cur=new int[prev.length];cur[0]=i;for(int j=1;j<cur.length;j++)cur[j]=word1.charAt(i-1)==word2.charAt(j-1)?prev[j-1]:1+Math.min(prev[j-1],Math.min(prev[j],cur[j-1]));prev=cur;}return prev[word2.length()];}
}
