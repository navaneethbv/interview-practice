class Solution {
public int findCenter(int[][] edges){int a=edges[0][0];return a==edges[1][0]||a==edges[1][1]?a:edges[0][1];}
}
