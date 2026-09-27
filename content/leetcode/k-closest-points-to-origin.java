class Solution {
public int[][] kClosest(int[][] points,int k) {
    Arrays.sort(points,Comparator.comparingInt(p->p[0]*p[0]+p[1]*p[1]));return Arrays.copyOf(points,k);
}
}
