class Solution {
    public String makeLargestSpecial(String s) {
        List<String> parts = new ArrayList<>();
        int balance = 0;
        int start = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == '1') {
                balance++;
            } else {
                balance--;
            }
            if (balance == 0) {
                String inside = makeLargestSpecial(s.substring(start + 1, index));
                parts.add("1" + inside + "0");
                start = index + 1;
            }
        }
        parts.sort(Collections.reverseOrder());
        return String.join("", parts);
    }
}
