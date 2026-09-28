from collections import defaultdict
class Solution:
    def minTransfers(self, transactions):
        balances = defaultdict(int)
        for sender, receiver, amount in transactions:
            balances[sender] -= amount
            balances[receiver] += amount
        debts = [balance for balance in balances.values() if balance]
        return self._settle(debts, 0)

    def _settle(self, debts, i):
        """Fewest transfers to clear debts[i:], settling debts[i] into an opposite-signed debt."""
        while i < len(debts) and debts[i] == 0:
            i += 1
        if i == len(debts):
            return 0

        best = len(debts) - i
        tried_balances = set()
        for j in range(i + 1, len(debts)):
            if debts[i] * debts[j] >= 0 or debts[j] in tried_balances:
                continue
            old_balance = debts[j]
            tried_balances.add(old_balance)
            debts[j] += debts[i]
            best = min(best, 1 + self._settle(debts, i + 1))
            debts[j] = old_balance
            if old_balance + debts[i] == 0:
                break
        return best
