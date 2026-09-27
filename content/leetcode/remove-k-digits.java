class Solution {
public String removeKdigits(String num,int k){StringBuilder b=new StringBuilder();for(char c:num.toCharArray()){while(k>0&&b.length()>0&&b.charAt(b.length()-1)>c){b.setLength(b.length()-1);k--;}b.append(c);}b.setLength(b.length()-k);int i=0;while(i<b.length()&&b.charAt(i)=='0')i++;return i==b.length()?"0":b.substring(i);}
}
