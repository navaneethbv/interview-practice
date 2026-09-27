class Solution {
public String convertToTitle(int columnNumber){StringBuilder out=new StringBuilder();while(columnNumber>0){columnNumber--;out.append((char)('A'+columnNumber%26));columnNumber/=26;}return out.reverse().toString();}
}
