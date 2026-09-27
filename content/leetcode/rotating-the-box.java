class Solution {
public char[][] rotateTheBox(char[][] boxGrid){int m=boxGrid.length,n=boxGrid[0].length;char[][] out=new char[n][m];for(char[] r:out)Arrays.fill(r,'.');for(int i=0;i<m;i++){int p=n-1;for(int j=n-1;j>=0;j--){if(boxGrid[i][j]=='*'){out[j][m-i-1]='*';p=j-1;}else if(boxGrid[i][j]=='#')out[p--][m-i-1]='#';}}return out;}
}
