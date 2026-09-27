class Solution {
    private int find(int[] parent,int x) {while(parent[x]!=x) {parent[x]=parent[parent[x]];x=parent[x];}return x;}
    public int countComponents(int n,int[][] edges) {
        int[] parent=new int[n];for(int i=0;i<n;i++) parent[i]=i;int count=n;
        for(int[] edge:edges) {int a=find(parent,edge[0]),b=find(parent,edge[1]);if(a!=b) {parent[a]=b;count--;}}
        return count;
    }
}
