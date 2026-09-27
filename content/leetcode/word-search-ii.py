class Solution:
    def findWords(self,board,words):
        trie={}
        for word in words:
            node=trie
            for ch in word: node=node.setdefault(ch,{})
            node['$']=word
        self._board=board;self._result=[]
        for r in range(len(board)):
            for c in range(len(board[0])): self._visit(r,c,trie)
        return self._result

    def _visit(self, r, c, parent):
        """Follows the trie from (r,c), collecting each word once and pruning exhausted branches."""
        board=self._board;ch=board[r][c]
        if ch not in parent: return
        node=parent[ch]
        if '$' in node: self._result.append(node.pop('$'))
        board[r][c]='#'
        for nr,nc in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
            if 0<=nr<len(board) and 0<=nc<len(board[0]): self._visit(nr,nc,node)
        board[r][c]=ch
        if not node: del parent[ch]
