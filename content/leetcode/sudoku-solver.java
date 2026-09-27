class Solution {
public void solveSudoku(char[][] board){go(board,0);}private boolean go(char[][] b,int i){if(i==81)return true;int r=i/9,c=i%9;if(b[r][c]!='.')return go(b,i+1);for(char v='1';v<='9';v++){boolean ok=true;for(int k=0;k<9;k++)if(b[r][k]==v||b[k][c]==v||b[r/3*3+k/3][c/3*3+k%3]==v){ok=false;break;}if(ok){b[r][c]=v;if(go(b,i+1))return true;}}b[r][c]='.';return false;}
}
