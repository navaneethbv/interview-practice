class Solution {
public double separateSquares(int[][] squares) {double total=0,left=Double.POSITIVE_INFINITY,right=0;for(int[] s:squares) {total+=(double)s[2]*s[2];left=Math.min(left,s[1]);right=Math.max(right,(double)s[1]+s[2]);}for(int i=0;i<90;i++) {double middle=(left+right)/2,below=0;for(int[] s:squares) below+=s[2]*Math.max(0,Math.min(s[2],middle-s[1]));if(below>=total/2) right=middle;else left=middle;}return right;}
}
