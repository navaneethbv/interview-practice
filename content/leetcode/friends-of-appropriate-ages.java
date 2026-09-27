class Solution {
    public int numFriendRequests(int[] ages) {
        int[] counts = new int[121];
        for (int age : ages) {
            counts[age]++;
        }
        int total = 0;
        for (int senderAge = 1; senderAge <= 120; senderAge++) {
            for (int recipientAge = 1; recipientAge <= 120; recipientAge++) {
                if (canRequest(senderAge, recipientAge)) {
                    int eligible = counts[recipientAge];
                    if (senderAge == recipientAge) {
                        eligible--;
                    }
                    total += counts[senderAge] * eligible;
                }
            }
        }
        return total;
    }

    private boolean canRequest(int senderAge, int recipientAge) {
        return 2 * recipientAge > senderAge + 14 && recipientAge <= senderAge;
    }
}
