class Solution {
    public boolean makesquare(int[] matchsticks) {
        long totalLength = 0;
        for (int stick : matchsticks) {
            totalLength += stick;
        }
        if (matchsticks.length < 4 || totalLength % 4 != 0) {
            return false;
        }

        int targetLength = (int) (totalLength / 4);
        Arrays.sort(matchsticks);
        reverse(matchsticks);
        if (matchsticks[0] > targetLength) {
            return false;
        }
        return place(matchsticks, 0, new int[4], targetLength);
    }

    private boolean place(int[] matchsticks, int index, int[] sideLengths, int targetLength) {
        if (index == matchsticks.length) {
            return true;
        }
        Set<Integer> triedLengths = new HashSet<>();
        int stick = matchsticks[index];
        for (int side = 0; side < 4; side++) {
            if (!triedLengths.add(sideLengths[side]) || sideLengths[side] + stick > targetLength) {
                continue;
            }
            sideLengths[side] += stick;
            if (place(matchsticks, index + 1, sideLengths, targetLength)) {
                return true;
            }
            sideLengths[side] -= stick;
        }
        return false;
    }

    private void reverse(int[] values) {
        for (int left = 0, right = values.length - 1; left < right; left++, right--) {
            int temporary = values[left];
            values[left] = values[right];
            values[right] = temporary;
        }
    }
}
