class Solution {
public int numJewelsInStones(String jewels,String stones){int out=0;for(char c:stones.toCharArray())if(jewels.indexOf(c)>=0)out++;return out;}
}
