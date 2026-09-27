class Solution {
public int[] asteroidCollision(int[] asteroids){int[]stack=new int[asteroids.length];int n=0;for(int x:asteroids){boolean alive=true;while(alive&&x<0&&n>0&&stack[n-1]>0){if(stack[n-1]<-x)n--;else{if(stack[n-1]==-x)n--;alive=false;}}if(alive)stack[n++]=x;}return Arrays.copyOf(stack,n);}
}
