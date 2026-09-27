class Solution {
public int minDeletionSize(String[] strs) {boolean[] settled=new boolean[strs.length-1];int removed=0;for(int c=0;c<strs[0].length();c++) {boolean bad=false;for(int i=0;i<settled.length;i++) if(!settled[i]&&strs[i].charAt(c)>strs[i+1].charAt(c)) {bad=true;break;}if(bad) {removed++;continue;}for(int i=0;i<settled.length;i++) settled[i]|=strs[i].charAt(c)<strs[i+1].charAt(c);}return removed;}
}
