class Solution {
public int maxVowels(String s,int k) {String vowels="aeiou";int count=0,best=0;for(int i=0;i<s.length();i++) {if(vowels.indexOf(s.charAt(i))>=0) count++;if(i>=k&&vowels.indexOf(s.charAt(i-k))>=0) count--;if(i>=k-1) best=Math.max(best,count);}return best;}
}
