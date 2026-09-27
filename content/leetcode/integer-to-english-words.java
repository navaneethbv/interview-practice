class Solution {
    private static final String[] BELOW_TWENTY = {"", "One", "Two", "Three", "Four", "Five",
            "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
            "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    private static final String[] TENS = {"", "", "Twenty", "Thirty", "Forty", "Fifty",
            "Sixty", "Seventy", "Eighty", "Ninety"};

    public String numberToWords(int num) {
        if (num == 0) {
            return "Zero";
        }
        String[] scales = {"", "Thousand", "Million", "Billion"};
        List<String> groups = new ArrayList<>();
        int scale = 0;
        while (num > 0) {
            int group = num % 1000;
            if (group != 0) {
                String words = belowThousand(group);
                if (!scales[scale].isEmpty()) {
                    words += " " + scales[scale];
                }
                groups.add(words);
            }
            num /= 1000;
            scale++;
        }
        Collections.reverse(groups);
        return String.join(" ", groups);
    }

    private String belowThousand(int number) {
        if (number < 20) {
            return BELOW_TWENTY[number];
        }
        if (number < 100) {
            return (TENS[number / 10] + " " + BELOW_TWENTY[number % 10]).trim();
        }
        String remainder = belowThousand(number % 100);
        if (remainder.isEmpty()) {
            return BELOW_TWENTY[number / 100] + " Hundred";
        }
        return BELOW_TWENTY[number / 100] + " Hundred " + remainder;
    }
}
