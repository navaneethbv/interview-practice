class Solution {
public boolean canTransform(String start,String result){int i=0,j=0,n=start.length();while(i<n||j<n){while(i<n&&start.charAt(i)=='X')i++;while(j<n&&result.charAt(j)=='X')j++;if(i==n||j==n)return i==n&&j==n;char c=start.charAt(i);if(c!=result.charAt(j)||(c=='L'&&j>i)||(c=='R'&&j<i))return false;i++;j++;}return true;}
}
