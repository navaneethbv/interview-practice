class Solution {
public int numFriendRequests(int[] ages){int[]c=new int[121];for(int a:ages)c[a]++;int total=0;for(int a=1;a<=120;a++)for(int b=1;b<=120;b++)if(2*b>a+14&&b<=a&&!(b>100&&a<100))total+=c[a]*(c[b]-(a==b?1:0));return total;}
}
