class Solution {
public int maxScore(int[] cardPoints,int k) {int score=0;for(int i=0;i<k;i++) score+=cardPoints[i];int best=score;for(int right=1;right<=k;right++) {score+=cardPoints[cardPoints.length-right]-cardPoints[k-right];best=Math.max(best,score);}return best;}
}
