class Solution {
    public boolean reverseCaseMatch(String s) {
        int lower = 0;
        int upper = s.length() - 1;
        for (int pair = 0; pair < s.length() / 2; pair++) {
            while (!Character.isLowerCase(s.charAt(lower))) {
                lower++;
            }
            while (!Character.isUpperCase(s.charAt(upper))) {
                upper--;
            }
            if (s.charAt(lower) != Character.toLowerCase(s.charAt(upper))) {
                return false;
            }
            lower++;
            upper--;
        }
        return true;
    }
}
