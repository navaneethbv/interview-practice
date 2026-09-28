class Solution {
    public int calPoints(String[] operations) {
        List<Integer> scores = new ArrayList<>();
        for (String operation : operations) {
            int size = scores.size();
            if (operation.equals("+")) {
                scores.add(scores.get(size - 1) + scores.get(size - 2));
            } else if (operation.equals("D")) {
                scores.add(2 * scores.get(size - 1));
            } else if (operation.equals("C")) {
                scores.remove(size - 1);
            } else {
                scores.add(Integer.parseInt(operation));
            }
        }
        int total = 0;
        for (int score : scores) {
            total += score;
        }
        return total;
    }
}
