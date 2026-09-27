class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> lines = new ArrayList<>();
        int start = 0;

        while (start < words.length) {
            int end = start;
            int letterCount = 0;
            while (end < words.length
                    && letterCount + words[end].length() + end - start <= maxWidth) {
                letterCount += words[end].length();
                end++;
            }

            lines.add(formatLine(words, start, end, letterCount, maxWidth));
            start = end;
        }

        return lines;
    }

    private String formatLine(
            String[] words, int start, int end, int letterCount, int maxWidth) {
        int wordCount = end - start;
        if (end == words.length || wordCount == 1) {
            return leftJustify(words, start, end, maxWidth);
        }

        int totalSpaces = maxWidth - letterCount;
        int baseSpaces = totalSpaces / (wordCount - 1);
        int extraSpaces = totalSpaces % (wordCount - 1);
        StringBuilder line = new StringBuilder();
        for (int offset = 0; offset < wordCount; offset++) {
            line.append(words[start + offset]);
            if (offset < wordCount - 1) {
                int spaces = baseSpaces + (offset < extraSpaces ? 1 : 0);
                line.append(" ".repeat(spaces));
            }
        }
        return line.toString();
    }

    private String leftJustify(String[] words, int start, int end, int maxWidth) {
        StringBuilder line = new StringBuilder();
        for (int index = start; index < end; index++) {
            if (index > start) {
                line.append(' ');
            }
            line.append(words[index]);
        }
        line.append(" ".repeat(maxWidth - line.length()));
        return line.toString();
    }
}
