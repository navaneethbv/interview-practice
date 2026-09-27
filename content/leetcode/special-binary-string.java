class Solution {
public String makeLargestSpecial(String s){List<String>parts=new ArrayList<>();int balance=0,start=0;for(int i=0;i<s.length();i++){balance+=s.charAt(i)=='1'?1:-1;if(balance==0){parts.add("1"+makeLargestSpecial(s.substring(start+1,i))+"0");start=i+1;}}parts.sort(Collections.reverseOrder());return String.join("",parts);}
}
