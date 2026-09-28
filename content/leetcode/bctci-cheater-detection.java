class Solution {
    public List<List<Integer>> findCheaters(String answers, int m, int[][] students, String[] responses) {
        Map<Integer, Integer> byDesk = new HashMap<>();
        Map<Integer, String> mistakes = new HashMap<>();
        for (int i = 0; i < students.length; i++) {
            byDesk.put(students[i][1], students[i][0]);
            mistakes.put(students[i][0], mistakeKey(answers, responses[i]));
        }
        List<List<Integer>> pairs = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : byDesk.entrySet()) {
            int desk = entry.getKey();
            int student = entry.getValue();
            Integer neighbor = byDesk.get(desk + 1);
            boolean sameRow = (desk - 1) / m == desk / m;
            String mine = mistakes.get(student);
            if (neighbor != null && sameRow && !mine.isEmpty() && mine.equals(mistakes.get(neighbor))) {
                pairs.add(List.of(Math.min(student, neighbor), Math.max(student, neighbor)));
            }
        }
        return pairs;
    }

    private String mistakeKey(String answers, String response) {
        StringBuilder key = new StringBuilder();
        for (int q = 0; q < answers.length(); q++) {
            if (response.charAt(q) != answers.charAt(q)) {
                key.append(q).append(response.charAt(q)).append(',');
            }
        }
        return key.toString();
    }
}
