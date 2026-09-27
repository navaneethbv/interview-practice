class Solution {
    private boolean search(char[][] b,String w,int r,int c,int i,boolean[][] seen) {
        if(r<0||r>=b.length||c<0||c>=b[0].length||seen[r][c]||b[r][c]!=w.charAt(i)) return false;
        if(i==w.length()-1) return true;seen[r][c]=true;
        boolean found=search(b,w,r-1,c,i+1,seen)||search(b,w,r+1,c,i+1,seen)||search(b,w,r,c-1,i+1,seen)||search(b,w,r,c+1,i+1,seen);
        seen[r][c]=false;return found;
    }
    public boolean exist(char[][] board,String word) {
        if(word.length()>board.length*board[0].length) return false;boolean[][] seen=new boolean[board.length][board[0].length];
        for(int r=0;r<board.length;r++) for(int c=0;c<board[0].length;c++) if(search(board,word,r,c,0,seen)) return true;
        return false;
    }
}
