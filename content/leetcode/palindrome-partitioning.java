class Solution {
    private boolean isPalindrome(String text, int left, int right) {
        while (left < right) {
            if (text.charAt(left) != text.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    private void buildPartitions(
            String text,
            int startIndex,
            List<String> path,
            List<List<String>> result) {
        if (startIndex == text.length()) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int endIndex = startIndex; endIndex < text.length(); endIndex++) {
            if (!isPalindrome(text, startIndex, endIndex)) {
                continue;
            }

            path.add(text.substring(startIndex, endIndex + 1));
            buildPartitions(text, endIndex + 1, path, result);
            path.remove(path.size() - 1);
        }
    }

    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        buildPartitions(s, 0, new ArrayList<>(), result);
        return result;
    }
}
