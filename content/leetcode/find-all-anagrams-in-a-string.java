class Solution {
public List<Integer> findAnagrams(String s,String p){int[]need=new int[26],have=new int[26];for(char c:p.toCharArray())need[c-'a']++;List<Integer>out=new ArrayList<>();for(int i=0;i<s.length();i++){have[s.charAt(i)-'a']++;if(i>=p.length())have[s.charAt(i-p.length())-'a']--;if(Arrays.equals(need,have))out.add(i-p.length()+1);}return out;}
}
