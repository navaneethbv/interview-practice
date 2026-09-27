class Solution {
public boolean hasAlternatingBits(int n){int previous=-1;while(n>0){int bit=n&1;if(bit==previous)return false;previous=bit;n>>>=1;}return true;}
}
