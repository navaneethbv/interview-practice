class Solution {
public boolean canConstruct(String ransomNote,String magazine){int[]c=new int[26];for(char x:magazine.toCharArray())c[x-'a']++;for(char x:ransomNote.toCharArray())if(--c[x-'a']<0)return false;return true;}
}
