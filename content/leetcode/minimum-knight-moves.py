class Solution:
    def minKnightMoves(self, x, y):
        x,y=sorted((abs(x),abs(y)),reverse=True)
        if (x,y)==(1,0):return 3
        if (x,y)==(2,2):return 4
        moves=max((x+1)//2,(x+y+2)//3)
        return moves+(moves+x+y)%2
