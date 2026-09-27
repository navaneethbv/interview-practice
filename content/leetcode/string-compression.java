class Solution {
public int compress(char[] chars) {int read=0,write=0;while(read<chars.length) {int end=read+1;while(end<chars.length&&chars[end]==chars[read]) end++;chars[write++]=chars[read];if(end-read>1) for(char d:Integer.toString(end-read).toCharArray()) chars[write++]=d;read=end;}return write;}
}
