class Solution:
    def champagneTower(self, poured, query_row, query_glass):
        row=[float(poured)]
        for _ in range(query_row):
            next_row=[0.0]*(len(row)+1)
            for i,value in enumerate(row):
                overflow=max(0.0,(value-1)/2);next_row[i]+=overflow;next_row[i+1]+=overflow
            row=next_row
        return min(1.0,row[query_glass])
