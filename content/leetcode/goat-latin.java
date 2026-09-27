class Solution {
public String toGoatLatin(String sentence){String[]words=sentence.split(" ");for(int i=0;i<words.length;i++){String w=words[i];if("aeiouAEIOU".indexOf(w.charAt(0))<0)w=w.substring(1)+w.charAt(0);words[i]=w+"ma"+"a".repeat(i+1);}return String.join(" ",words);}
}
