class Solution {
    public boolean hasProductTriplet(String[] words, int target) {
        Set<Integer> sums = new HashSet<>();
        for (String word : words) {
            int total = 0;
            for (char letter : word.toCharArray()) {
                total += letter - 'a' + 1;
            }
            sums.add(total);
        }
        for (int first : sums) {
            for (int second : sums) {
                int product = first * second;
                if (target % product == 0 && sums.contains(target / product)) {
                    return true;
                }
            }
        }
        return false;
    }
}
