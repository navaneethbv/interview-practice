class Solution {
    public String discountPrices(String sentence, int discount) {
        String[] words = sentence.split(" ");
        for (int index = 0; index < words.length; index++) {
            if (isPrice(words[index])) {
                long dollars = Long.parseLong(words[index].substring(1));
                long cents = dollars * (100L - discount);
                words[index] = formatCents(cents);
            }
        }
        return String.join(" ", words);
    }

    private boolean isPrice(String word) {
        if (word.length() <= 1 || word.charAt(0) != '$') {
            return false;
        }
        for (int index = 1; index < word.length(); index++) {
            if (word.charAt(index) < '0' || word.charAt(index) > '9') {
                return false;
            }
        }
        return true;
    }

    private String formatCents(long cents) {
        long whole = cents / 100;
        long remainder = cents % 100;
        String suffix = remainder < 10 ? "0" + remainder : String.valueOf(remainder);
        return "$" + whole + "." + suffix;
    }
}
