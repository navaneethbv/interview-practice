class Solution:
    def totalNQueens(self, n):
        mask=(1<<n)-1
        def search(cols,left,right):
            if cols==mask: return 1
            choices=mask & ~(cols|left|right); total=0
            while choices:
                bit=choices & -choices; choices-=bit
                total+=search(cols|bit,((left|bit)<<1)&mask,(right|bit)>>1)
            return total
        return search(0,0,0)
