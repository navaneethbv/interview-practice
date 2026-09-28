class Solution {
    public int bestClosingTime(String customers) {
        int penalty = 0;
        for (int index = 0; index < customers.length(); index++) {
            char customer = customers.charAt(index);
            if (customer == 'Y') {
                penalty++;
            }
        }
        int bestPenalty = penalty;
        int answer = 0;
        for (int hour = 0; hour < customers.length(); hour++) {
            penalty += customers.charAt(hour) == 'N' ? 1 : -1;
            if (penalty < bestPenalty) {
                bestPenalty = penalty;
                answer = hour + 1;
            }
        }
        return answer;
    }
}
