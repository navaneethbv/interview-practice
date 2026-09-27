class Solution {
public boolean checkInclusion(String s1,String s2) {
    if(s1.length()>s2.length()) return false;int[] wanted=new int[26],window=new int[26];
    for(char c:s1.toCharArray()) wanted[c-'a']++;
    for(int i=0;i<s2.length();i++) {window[s2.charAt(i)-'a']++;if(i>=s1.length()) window[s2.charAt(i-s1.length())-'a']--;if(Arrays.equals(wanted,window)) return true;}
    return false;
}
}
