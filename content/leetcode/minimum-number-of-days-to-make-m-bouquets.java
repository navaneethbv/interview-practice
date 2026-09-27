class Solution {
public int minDays(int[] bloomDay,int m,int k){if((long)m*k>bloomDay.length)return -1;int l=Integer.MAX_VALUE,r=0;for(int d:bloomDay){l=Math.min(l,d);r=Math.max(r,d);}while(l<r){int day=l+(r-l)/2,run=0,count=0;for(int d:bloomDay){run=d<=day?run+1:0;if(run==k){count++;run=0;}}if(count>=m)r=day;else l=day+1;}return l;}
}
