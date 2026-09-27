class Solution {
public double[] getCollisionTimes(int[][] cars){int n=cars.length;double[] a=new double[n];Arrays.fill(a,-1);int[] st=new int[n];int size=0;for(int i=n-1;i>=0;i--){while(size>0){int j=st[size-1];if(cars[i][1]<=cars[j][1]){size--;continue;}double t=(double)(cars[j][0]-cars[i][0])/(cars[i][1]-cars[j][1]);if(a[j]<0||t<=a[j]){a[i]=t;break;}size--;}st[size++]=i;}return a;}
}
