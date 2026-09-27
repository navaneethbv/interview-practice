class Solution {
    int[] prefix; Random random=new Random(0);
    public Solution(int[] w) { prefix=w.clone();for(int i=1;i<w.length;i++)prefix[i]+=prefix[i-1]; }
    public int pickIndex() { int value=random.nextInt(prefix[prefix.length-1]),lo=0,hi=prefix.length-1;while(lo<hi){int mid=lo+(hi-lo)/2;if(prefix[mid]>value)hi=mid;else lo=mid+1;}return lo; }
}
