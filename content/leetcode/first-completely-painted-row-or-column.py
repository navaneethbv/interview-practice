class Solution:
 def firstCompleteIndex(self,arr,mat):
  m,n=len(mat),len(mat[0]);pos={v:(i,j) for i,row in enumerate(mat) for j,v in enumerate(row)};rows=[0]*m;cols=[0]*n
  for t,v in enumerate(arr):
   i,j=pos[v];rows[i]+=1;cols[j]+=1
   if rows[i]==n or cols[j]==m:return t
