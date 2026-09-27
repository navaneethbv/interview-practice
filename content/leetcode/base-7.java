class Solution {
public String convertToBase7(int num) {if(num==0) return "0";boolean negative=num<0;num=Math.abs(num);StringBuilder out=new StringBuilder();while(num>0) {out.append(num%7);num/=7;}if(negative) out.append('-');return out.reverse().toString();}
}
