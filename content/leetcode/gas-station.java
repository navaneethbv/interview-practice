class Solution {
public int canCompleteCircuit(int[] gas,int[] cost){int total=0,tank=0,start=0;for(int i=0;i<gas.length;i++){int delta=gas[i]-cost[i];total+=delta;tank+=delta;if(tank<0){tank=0;start=i+1;}}return total>=0?start:-1;}
}
