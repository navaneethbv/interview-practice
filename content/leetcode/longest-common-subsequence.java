class Solution {
public int longestCommonSubsequence(String text1,String text2){int[] prev=new int[text2.length()+1];for(char a:text1.toCharArray()){int[] cur=new int[prev.length];for(int j=0;j<text2.length();j++)cur[j+1]=a==text2.charAt(j)?prev[j]+1:Math.max(prev[j+1],cur[j]);prev=cur;}return prev[text2.length()];}
}
