class Solution {
public int uniqueMorseRepresentations(String[] words){String[]codes={".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."};Set<String>seen=new HashSet<>();for(String word:words){StringBuilder b=new StringBuilder();for(char c:word.toCharArray())b.append(codes[c-'a']);seen.add(b.toString());}return seen.size();}
}
