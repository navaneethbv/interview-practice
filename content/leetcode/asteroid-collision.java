class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        int[] survivors = new int[asteroids.length];
        int survivorCount = 0;
        for (int value : asteroids) {
            boolean survives = true;
            while (survives && value < 0 && survivorCount > 0
                    && survivors[survivorCount - 1] > 0) {
                if (survivors[survivorCount - 1] < -value) {
                    survivorCount--;
                } else {
                    if (survivors[survivorCount - 1] == -value) {
                        survivorCount--;
                    }
                    survives = false;
                }
            }
            if (survives) {
                survivors[survivorCount++] = value;
            }
        }
        return Arrays.copyOf(survivors, survivorCount);
    }
}
