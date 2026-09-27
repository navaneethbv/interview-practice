class Solution {
public int minRefuelStops(int target,int startFuel,int[][] stations) {PriorityQueue<Integer> heap=new PriorityQueue<>(Comparator.reverseOrder());long reached=startFuel;int i=0,stops=0;while(reached<target) {while(i<stations.length&&stations[i][0]<=reached) heap.add(stations[i++][1]);if(heap.isEmpty()) return -1;reached+=heap.remove();stops++;}return stops;}
}
