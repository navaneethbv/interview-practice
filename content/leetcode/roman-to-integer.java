class Solution {
    public int romanToInt(String s) {
        int[] values = new int[128];
        values['I'] = 1;
        values['V'] = 5;
        values['X'] = 10;
        values['L'] = 50;
        values['C'] = 100;
        values['D'] = 500;
        values['M'] = 1000;
        int total = 0;
        for (int index = 0; index < s.length(); index++) {
            int currentValue = values[s.charAt(index)];
            boolean subtract = index + 1 < s.length()
                    && currentValue < values[s.charAt(index + 1)];
            total += subtract ? -currentValue : currentValue;
        }
        return total;
    }
}
