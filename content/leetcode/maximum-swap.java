class Solution {
public int maximumSwap(int num){char[]s=String.valueOf(num).toCharArray();int[]last=new int[10];Arrays.fill(last,-1);for(int i=0;i<s.length;i++)last[s[i]-'0']=i;for(int i=0;i<s.length;i++)for(int d=9;d>s[i]-'0';d--)if(last[d]>i){int j=last[d];char t=s[i];s[i]=s[j];s[j]=t;return Integer.parseInt(new String(s));}return num;}
}
