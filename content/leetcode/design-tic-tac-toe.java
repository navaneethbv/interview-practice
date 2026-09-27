class TicTacToe {
    private final int n;private final int[] rows,cols;private int diag,anti;
    public TicTacToe(int n) {this.n=n;rows=new int[n];cols=new int[n];}
    public int move(int row,int col,int player) {int value=player==1?1:-1;rows[row]+=value;cols[col]+=value;if(row==col) diag+=value;if(row+col==n-1) anti+=value;return Math.abs(rows[row])==n||Math.abs(cols[col])==n||Math.abs(diag)==n||Math.abs(anti)==n?player:0;}
}
