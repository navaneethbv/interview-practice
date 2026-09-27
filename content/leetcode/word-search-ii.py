class Solution:
    def findWords(self,board,words):
        trie={}
        for word in words:
            node=trie
            for ch in word: node=node.setdefault(ch,{})
            node['$']=word
        result=[]
        rows,cols=len(board),len(board[0])
        def visit(r,c,parent):
            ch=board[r][c]
            if ch not in parent: return
            node=parent[ch]
            if '$' in node: result.append(node.pop('$'))
            board[r][c]='#'
            for nr,nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=nr<rows and 0<=nc<cols: visit(nr,nc,node)
            board[r][c]=ch
            if not node: del parent[ch]
        for r in range(rows):
            for c in range(cols): visit(r,c,trie)
        return result
