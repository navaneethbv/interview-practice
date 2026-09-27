class Solution {
    public int numMatchingSubseq(String s, String[] words) {
        List<List<Integer>> positions = new ArrayList<>();
        for (int letter = 0; letter < 26; letter++) {
            positions.add(new ArrayList<>());
        }
        for (int index = 0; index < s.length(); index++) {
            positions.get(s.charAt(index) - 'a').add(index);
        }

        int matchingCount = 0;
        for (String word : words) {
            int previousIndex = -1;
            boolean matches = true;
            for (char character : word.toCharArray()) {
                List<Integer> indexes = positions.get(character - 'a');
                int nextIndex = firstIndexAfter(indexes, previousIndex);
                if (nextIndex == indexes.size()) {
                    matches = false;
                    break;
                }
                previousIndex = indexes.get(nextIndex);
            }
            if (matches) {
                matchingCount++;
            }
        }
        return matchingCount;
    }

    private int firstIndexAfter(List<Integer> indexes, int previousIndex) {
        int left = 0;
        int right = indexes.size();
        while (left < right) {
            int middle = (left + right) / 2;
            if (indexes.get(middle) <= previousIndex) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left;
    }
}
