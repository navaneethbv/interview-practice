class Solution {
    public boolean checkPerfectNumber(int num){if(num<=1)return false;long sum=1;for(int d=2;(long)d*d<=num;d++)if(num%d==0){sum+=d;if(d!=num/d)sum+=num/d;}return sum==num;}
}
