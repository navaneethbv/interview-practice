class Solution {
private int opening(int[] bars) {Arrays.sort(bars);int best=2,current=2;for(int i=1;i<bars.length;i++) {current=bars[i]==bars[i-1]+1?current+1:2;best=Math.max(best,current);}return best;}public int maximizeSquareHoleArea(int n,int m,int[] hBars,int[] vBars) {int side=Math.min(opening(hBars),opening(vBars));return side*side;}
}
