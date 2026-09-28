class Solution {
    public int maximumCandies(int[] candies,long k){
        int l=0,r=Arrays.stream(candies).max().orElse(0);
        while (l<r){
            int size=(l+r+1)/2;
            long count=0;
            for (int pile:candies) {
                count+=pile/size;
            }
            if (count>=k) {
                l=size;
            }
            else r=size-1;
        }
        return l;
    }
}
