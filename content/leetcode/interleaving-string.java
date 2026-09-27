class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int firstLength = s1.length();
        int secondLength = s2.length();
        if (firstLength + secondLength != s3.length()) {
            return false;
        }

        boolean[] reachable = new boolean[secondLength + 1];
        reachable[0] = true;

        for (int firstIndex = 0; firstIndex <= firstLength; firstIndex++) {
            for (int secondIndex = 0; secondIndex <= secondLength; secondIndex++) {
                if (firstIndex == 0 && secondIndex == 0) {
                    continue;
                }

                int outputIndex = firstIndex + secondIndex - 1;
                boolean fromFirst = firstIndex > 0
                        && reachable[secondIndex]
                        && s1.charAt(firstIndex - 1) == s3.charAt(outputIndex);
                boolean fromSecond = secondIndex > 0
                        && reachable[secondIndex - 1]
                        && s2.charAt(secondIndex - 1) == s3.charAt(outputIndex);
                reachable[secondIndex] = fromFirst || fromSecond;
            }
        }

        return reachable[secondLength];
    }
}
