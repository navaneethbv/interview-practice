class Solution {
public int numOfWays(int n) {long two=6,three=6,mod=1000000007;for(int i=1;i<n;i++) {long nextTwo=(3*two+2*three)%mod,nextThree=(2*two+2*three)%mod;two=nextTwo;three=nextThree;}return (int)((two+three)%mod);}
}
