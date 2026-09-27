class Solution {
    public int minTransfers(int[][] transactions) {
        Map<Integer, Integer> balances = new HashMap<>();
        for (int[] transaction : transactions) {
            balances.put(transaction[0], balances.getOrDefault(transaction[0], 0) - transaction[2]);
            balances.put(transaction[1], balances.getOrDefault(transaction[1], 0) + transaction[2]);
        }

        List<Integer> debts = new ArrayList<>();
        for (int balance : balances.values()) {
            if (balance != 0) {
                debts.add(balance);
            }
        }
        return settle(debts, 0);
    }

    private int settle(List<Integer> debts, int start) {
        while (start < debts.size() && debts.get(start) == 0) {
            start++;
        }
        if (start == debts.size()) {
            return 0;
        }

        int best = debts.size() - start;
        Set<Integer> triedBalances = new HashSet<>();
        for (int index = start + 1; index < debts.size(); index++) {
            int current = debts.get(start);
            int other = debts.get(index);
            if (current * (long) other >= 0 || !triedBalances.add(other)) {
                continue;
            }
            debts.set(index, other + current);
            best = Math.min(best, 1 + settle(debts, start + 1));
            debts.set(index, other);
            if (other + current == 0) {
                break;
            }
        }
        return best;
    }
}
