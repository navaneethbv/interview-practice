class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals,Comparator.comparingInt(x->x[0]));List<int[]> out=new ArrayList<>();
        for(int[] x:intervals) {if(!out.isEmpty()&&x[0]<=out.get(out.size()-1)[1]) out.get(out.size()-1)[1]=Math.max(out.get(out.size()-1)[1],x[1]);else out.add(x.clone());}
        return out.toArray(new int[0][]);
    }
}
