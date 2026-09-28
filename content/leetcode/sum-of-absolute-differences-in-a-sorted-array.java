class Solution {
    public int[] getSumAbsoluteDifferences(int[] nums){
        int total=0,p=0,n=nums.length;
        for (int x:nums) {
            total+=x;
        }
        int[] a=new int[n];
        for (int i=0;i<n;i++){
            int x=nums[i];
            a[i]=x*i-p+total-p-x-x*(n-i-1);
            p+=x;
        }
        return a;
    }
}
