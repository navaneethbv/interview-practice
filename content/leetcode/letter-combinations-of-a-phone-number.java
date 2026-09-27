class Solution {
public List<String> letterCombinations(String digits){String[] keys={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};List<String> out=new ArrayList<>();if(digits.isEmpty())return out;out.add("");for(char d:digits.toCharArray()){List<String> next=new ArrayList<>();for(String p:out)for(char c:keys[d-'0'].toCharArray())next.add(p+c);out=next;}return out;}
}
