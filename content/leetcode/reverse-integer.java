class Solution {
public int reverse(int x){int out=0;while(x!=0){int digit=x%10;x/=10;if(out>214748364||(out==214748364&&digit>7)||out<-214748364||(out==-214748364&&digit<-8))return 0;out=out*10+digit;}return out;}
}
