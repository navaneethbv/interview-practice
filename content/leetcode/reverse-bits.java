class Solution {
public int reverseBits(int n){int out=0;for(int i=0;i<32;i++){out=(out<<1)|(n&1);n>>>=1;}return out;}
}
