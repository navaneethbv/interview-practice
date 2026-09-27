class Solution {
    private final int[] original;private final Random random=new Random(429);
    public Solution(int[] nums){original=nums.clone();}
    public int[] reset(){return original.clone();}
    public int[] shuffle(){int[] a=original.clone();for(int i=a.length-1;i>0;i--){int j=random.nextInt(i+1),t=a[i];a[i]=a[j];a[j]=t;}return a;}
}
