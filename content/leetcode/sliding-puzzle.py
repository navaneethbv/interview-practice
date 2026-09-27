from collections import deque
class Solution:
    def slidingPuzzle(self,board):
        start=tuple(board[0]+board[1]);target=(1,2,3,4,5,0);q=deque([(start,0)]);seen={start};neighbors=[[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]]
        while q:
            state,steps=q.popleft()
            if state==target:return steps
            zero=state.index(0)
            for j in neighbors[zero]:
                values=list(state);values[zero],values[j]=values[j],values[zero];next_state=tuple(values)
                if next_state not in seen:seen.add(next_state);q.append((next_state,steps+1))
        return -1
