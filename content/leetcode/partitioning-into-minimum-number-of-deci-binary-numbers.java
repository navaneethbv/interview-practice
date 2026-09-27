class Solution {
public int minPartitions(String n){int best=0;for(char c:n.toCharArray())best=Math.max(best,c-'0');return best;}
}
