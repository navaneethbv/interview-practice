class Solution {
public int countBattleships(char[][] board) {int count=0;for(int r=0;r<board.length;r++) for(int c=0;c<board[0].length;c++) if(board[r][c]=='X'&&(r==0||board[r-1][c]!='X')&&(c==0||board[r][c-1]!='X')) count++;return count;}
}
