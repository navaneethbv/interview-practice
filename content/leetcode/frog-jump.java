class Solution {
public boolean canCross(int[] stones){Map<Long,Set<Integer>>jumps=new HashMap<>();for(int p:stones)jumps.put((long)p,new HashSet<>());jumps.get(0L).add(0);for(int p:stones)for(int last:jumps.get((long)p))for(int d=last-1;d<=last+1;d++)if(d>0&&jumps.containsKey((long)p+d))jumps.get((long)p+d).add(d);return !jumps.get((long)stones[stones.length-1]).isEmpty();}
}
