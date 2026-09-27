class Solution {
public String addStrings(String num1,String num2) {int i=num1.length()-1,j=num2.length()-1,carry=0;StringBuilder out=new StringBuilder();while(i>=0||j>=0||carry!=0) {int total=carry+(i>=0?num1.charAt(i--)-'0':0)+(j>=0?num2.charAt(j--)-'0':0);out.append(total%10);carry=total/10;}return out.reverse().toString();}
}
