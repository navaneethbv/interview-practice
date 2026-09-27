class Solution {
public boolean hasAllCodes(String s,int k){int target=1<<k;if(s.length()-k+1<target)return false;boolean[]seen=new boolean[target];int count=0,value=0;for(int i=0;i<s.length();i++){value=((value<<1)|(s.charAt(i)-'0'))&(target-1);if(i>=k-1&&!seen[value]){seen[value]=true;count++;}}return count==target;}
}
