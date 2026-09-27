class Solution {
public boolean carPooling(int[][] trips,int capacity){int[]change=new int[1001];for(int[]t:trips){change[t[1]]+=t[0];change[t[2]]-=t[0];}int passengers=0;for(int delta:change){passengers+=delta;if(passengers>capacity)return false;}return true;}
}
