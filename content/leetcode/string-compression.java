class Solution {
    public int compress(char[] chars) {
        int readIndex = 0;
        int writeIndex = 0;

        while (readIndex < chars.length) {
            int runEnd = readIndex + 1;
            while (runEnd < chars.length && chars[runEnd] == chars[readIndex]) {
                runEnd++;
            }

            chars[writeIndex++] = chars[readIndex];
            int runLength = runEnd - readIndex;
            if (runLength > 1) {
                String count = Integer.toString(runLength);
                for (int index = 0; index < count.length(); index++) {
                    chars[writeIndex++] = count.charAt(index);
                }
            }
            readIndex = runEnd;
        }

        return writeIndex;
    }
}
