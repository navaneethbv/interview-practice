class Solution {
    public String robotMoves(String seq) {
        String[] expansions = new String[seq.length() + 2];
        expansions[seq.length()] = "";
        expansions[seq.length() + 1] = "";
        for (int index = seq.length() - 1; index >= 0; index--) {
            char instruction = seq.charAt(index);
            if (instruction == '2') {
                expansions[index] = expansions[index + 1] + expansions[index + 2];
            } else {
                expansions[index] = instruction + expansions[index + 1];
            }
        }
        return expansions[0];
    }
}
