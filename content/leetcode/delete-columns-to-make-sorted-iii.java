class Solution {
public int minDeletionSize(String[] strs) {int columns=strs[0].length();int[] best=new int[columns];Arrays.fill(best,1);int longest=1;for(int r=0;r<columns;r++) {for(int l=0;l<r;l++) {boolean valid=true;for(String row:strs) if(row.charAt(l)>row.charAt(r)) {valid=false;break;}if(valid) best[r]=Math.max(best[r],best[l]+1);}longest=Math.max(longest,best[r]);}return columns-longest;}
}
