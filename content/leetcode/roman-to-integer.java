class Solution {
public int romanToInt(String s){int[]v=new int[128];v['I']=1;v['V']=5;v['X']=10;v['L']=50;v['C']=100;v['D']=500;v['M']=1000;int total=0;for(int i=0;i<s.length();i++){int x=v[s.charAt(i)];total+=i+1<s.length()&&x<v[s.charAt(i+1)]?-x:x;}return total;}
}
