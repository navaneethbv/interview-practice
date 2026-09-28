class Solution {
    public String getHint(String secret, String guess) {
        int bulls = countBulls(secret, guess);
        int matches = countSharedDigits(secret, guess);
        return bulls + "A" + (matches - bulls) + "B";
    }

    private int countBulls(String secret, String guess) {
        int bulls = 0;
        for (int index = 0; index < secret.length(); index++) {
            if (secret.charAt(index) == guess.charAt(index)) {
                bulls++;
            }
        }
        return bulls;
    }

    private int countSharedDigits(String secret, String guess) {
        int[] secretCounts = new int[10];
        int[] guessCounts = new int[10];
        for (int index = 0; index < secret.length(); index++) {
            secretCounts[secret.charAt(index) - '0']++;
            guessCounts[guess.charAt(index) - '0']++;
        }
        int shared = 0;
        for (int digit = 0; digit < 10; digit++) {
            shared += Math.min(secretCounts[digit], guessCounts[digit]);
        }
        return shared;
    }
}
