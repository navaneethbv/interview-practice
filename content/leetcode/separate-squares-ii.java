class Solution {
private long[] length;private int[] covers,xs;
private void update(int node,int left,int right,int start,int end,int delta) {
    if(start<=left&&right<=end) covers[node]+=delta;
    else {int middle=(left+right)/2;if(start<=middle) update(node*2,left,middle,start,end,delta);if(end>middle) update(node*2+1,middle+1,right,start,end,delta);}
    if(covers[node]>0) length[node]=(long)xs[right+1]-xs[left];else if(left==right) length[node]=0;else length[node]=length[node*2]+length[node*2+1];
}
public double separateSquares(int[][] squares) {
    TreeSet<Integer> coordinates=new TreeSet<>();for(int[] s:squares) {coordinates.add(s[0]);coordinates.add(s[0]+s[2]);}xs=coordinates.stream().mapToInt(Integer::intValue).toArray();int size=xs.length-1;length=new long[4*size];covers=new int[4*size];Map<Integer,Integer> index=new HashMap<>();for(int i=0;i<xs.length;i++) index.put(xs[i],i);
    List<int[]> events=new ArrayList<>();for(int[] s:squares) {events.add(new int[]{s[1],1,index.get(s[0]),index.get(s[0]+s[2])-1});events.add(new int[]{s[1]+s[2],-1,index.get(s[0]),index.get(s[0]+s[2])-1});}events.sort(Comparator.comparingInt(e->e[0]));long previous=events.get(0)[0],total=0;List<long[]> strips=new ArrayList<>();
    for(int[] e:events) {if(e[0]>previous) {strips.add(new long[]{previous,e[0],length[1]});total+=(e[0]-previous)*length[1];previous=e[0];}update(1,0,size-1,e[2],e[3],e[1]);}
    long accumulated=0;for(long[] strip:strips) {long area=(strip[1]-strip[0])*strip[2];if((double)accumulated+area>=total/2.0) {if(accumulated==total/2.0) return strip[0];return strip[0]+(total/2.0-accumulated)/strip[2];}accumulated+=area;}return previous;
}
}
