class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) {
            return false;
        }

        TreeMap<Integer, Integer> remainingCards = new TreeMap<>();
        for (int card : hand) {
            remainingCards.merge(card, 1, Integer::sum);
        }

        while (!remainingCards.isEmpty()) {
            int firstValue = remainingCards.firstKey();
            int copies = remainingCards.get(firstValue);
            for (int value = firstValue; value < firstValue + groupSize; value++) {
                int available = remainingCards.getOrDefault(value, 0);
                if (available < copies) {
                    return false;
                }
                if (available == copies) {
                    remainingCards.remove(value);
                } else {
                    remainingCards.put(value, available - copies);
                }
            }
        }
        return true;
    }
}
