class Solution {
private void change(TreeMap<Integer,Integer> map,int value,int delta) {int count=map.getOrDefault(value,0)+delta;if(count==0) map.remove(value);else map.put(value,count);}
public double[] medianSlidingWindow(int[] nums,int k) {
    TreeMap<Integer,Integer> low=new TreeMap<>(),high=new TreeMap<>();int lowSize=0,highSize=0;double[] result=new double[nums.length-k+1];
    for(int i=0;i<nums.length;i++) {
        int value=nums[i];if(low.isEmpty()||value<=low.lastKey()) {change(low,value,1);lowSize++;}else {change(high,value,1);highSize++;}
        if(i>=k) {int old=nums[i-k];if(low.containsKey(old)) {change(low,old,-1);lowSize--;}else {change(high,old,-1);highSize--;}}
        while(lowSize>highSize+1) {int v=low.lastKey();change(low,v,-1);change(high,v,1);lowSize--;highSize++;}
        while(lowSize<highSize) {int v=high.firstKey();change(high,v,-1);change(low,v,1);highSize--;lowSize++;}
        if(i>=k-1) result[i-k+1]=k%2==1?low.lastKey():((double)low.lastKey()+high.firstKey())/2;
    }
    return result;
}
}
