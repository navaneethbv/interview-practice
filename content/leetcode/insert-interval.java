class Solution {
    public int[][] insert(int[][] intervals,int[] newInterval) {
        List<int[]> out=new ArrayList<>();int a=newInterval[0],b=newInterval[1];boolean placed=false;
        for(int[] x:intervals) {if(x[1]<a) out.add(x);else if(x[0]>b) {if(!placed) {out.add(new int[]{a,b});placed=true;}out.add(x);}else {a=Math.min(a,x[0]);b=Math.max(b,x[1]);}}
        if(!placed) out.add(new int[]{a,b});return out.toArray(new int[0][]);
    }
}
