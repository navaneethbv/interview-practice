class TicTacToe:
    def __init__(self, n): self.n=n; self.rows=[0]*n; self.cols=[0]*n; self.diag=self.anti=0
    def move(self, row, col, player):
        value=1 if player==1 else -1
        self.rows[row]+=value; self.cols[col]+=value
        if row==col: self.diag+=value
        if row+col==self.n-1: self.anti+=value
        return player if max(abs(self.rows[row]),abs(self.cols[col]),abs(self.diag),abs(self.anti))==self.n else 0
