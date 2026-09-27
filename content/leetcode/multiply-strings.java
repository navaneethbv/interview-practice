class Solution {
public String multiply(String num1,String num2){int[]out=new int[num1.length()+num2.length()];for(int i=num1.length()-1;i>=0;i--)for(int j=num2.length()-1;j>=0;j--){int value=(num1.charAt(i)-'0')*(num2.charAt(j)-'0')+out[i+j+1];out[i+j+1]=value%10;out[i+j]+=value/10;}StringBuilder b=new StringBuilder();for(int digit:out)if(b.length()>0||digit!=0)b.append(digit);return b.length()==0?"0":b.toString();}
}
