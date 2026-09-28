class Solution {
    public String urlify(String value, int trueLength) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < trueLength; i++) {
            char current = value.charAt(i);
            result.append(current == ' ' ? "%20" : current);
        }
        return result.toString();
    }
}
