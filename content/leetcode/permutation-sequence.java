class Solution {
public String getPermutation(int n,int k){int[]fact=new int[n+1];fact[0]=1;List<Integer>available=new ArrayList<>();for(int i=1;i<=n;i++){fact[i]=fact[i-1]*i;available.add(i);}k--;StringBuilder out=new StringBuilder();while(!available.isEmpty()){int block=fact[available.size()-1];out.append(available.remove(k/block));k%=block;}return out.toString();}
}
