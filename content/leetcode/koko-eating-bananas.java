class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = Arrays.stream(piles).max().orElseThrow();
        while (left < right) {
            int speed = left + (right - left) / 2;
            if (hoursNeeded(piles, speed) <= h) {
                right = speed;
            } else {
                left = speed + 1;
            }
        }
        return left;
    }

    private long hoursNeeded(int[] piles, int speed) {
        long hours = 0;
        for (int pile : piles) {
            hours += (pile + (long) speed - 1) / speed;
        }
        return hours;
    }
}
