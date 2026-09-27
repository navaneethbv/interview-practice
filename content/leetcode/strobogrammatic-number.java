class Solution {
public boolean isStrobogrammatic(String num) {String from="01689",to="01986";for(int i=0,j=num.length()-1;i<=j;i++,j--) {int k=from.indexOf(num.charAt(i));if(k<0||to.charAt(k)!=num.charAt(j)) return false;}return true;}
}
