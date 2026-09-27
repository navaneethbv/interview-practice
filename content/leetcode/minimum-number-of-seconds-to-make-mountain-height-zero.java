class Solution {
public long minNumberOfSeconds(int mountainHeight,int[] workerTimes){int fastest=Arrays.stream(workerTimes).min().getAsInt();long lo=0,hi=(long)fastest*mountainHeight*(mountainHeight+1)/2;while(lo<hi){long mid=lo+(hi-lo)/2,count=0;for(int t:workerTimes){long budget=mid/t,l=0,r=mountainHeight;while(l<r){long m=(l+r+1)/2;if(m*(m+1)/2<=budget)l=m;else r=m-1;}count+=l;if(count>=mountainHeight)break;}if(count>=mountainHeight)hi=mid;else lo=mid+1;}return lo;}
}
