class Solution {
    public int rotatedDigits(int n){
        int ans=0;
        for (int v=1;v<=n;v++){
            boolean good=false,ok=true;
            for (int x=v;x>0;x/=10){
                int d=x%10;
                if (d==3||d==4||d==7) {
                    ok=false;
                }
                if (d==2||d==5||d==6||d==9) {
                    good=true;
                }
            }
            if (ok&&good) {
                ans++;
            }
        }
        return ans;
    }
}
