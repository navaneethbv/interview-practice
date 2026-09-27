class Solution {
public String convert(String s,int numRows) {
    if(numRows==1||numRows>=s.length()) return s;
    StringBuilder[] rows=new StringBuilder[numRows];for(int i=0;i<numRows;i++) rows[i]=new StringBuilder();int r=0,step=1;
    for(char c:s.toCharArray()) {rows[r].append(c);if(r==0) step=1;else if(r==numRows-1) step=-1;r+=step;}
    StringBuilder out=new StringBuilder();for(StringBuilder row:rows) out.append(row);return out.toString();
}
}
