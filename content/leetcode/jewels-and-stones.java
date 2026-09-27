class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        int count = 0;
        for (int index = 0; index < stones.length(); index++) {
            if (jewels.indexOf(stones.charAt(index)) >= 0) {
                count++;
            }
        }
        return count;
    }
}
