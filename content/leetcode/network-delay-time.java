class Solution {
public int networkDelayTime(int[][] times,int n,int k){int[]d=new int[n+1];Arrays.fill(d,1000000000);d[k]=0;for(int i=1;i<n;i++){boolean changed=false;for(int[]e:times)if(d[e[0]]+e[2]<d[e[1]]){d[e[1]]=d[e[0]]+e[2];changed=true;}if(!changed)break;}int answer=0;for(int i=1;i<=n;i++)answer=Math.max(answer,d[i]);return answer==1000000000?-1:answer;}
}
