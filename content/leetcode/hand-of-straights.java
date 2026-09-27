class Solution {
public boolean isNStraightHand(int[] hand,int groupSize){if(hand.length%groupSize!=0)return false;TreeMap<Integer,Integer>count=new TreeMap<>();for(int x:hand)count.merge(x,1,Integer::sum);while(!count.isEmpty()){int start=count.firstKey(),copies=count.get(start);for(int x=start;x<start+groupSize;x++){int n=count.getOrDefault(x,0);if(n<copies)return false;if(n==copies)count.remove(x);else count.put(x,n-copies);}}return true;}
}
