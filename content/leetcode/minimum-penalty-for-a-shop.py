class Solution:
    def bestClosingTime(self, customers):
        penalty = customers.count("Y")
        best_penalty = penalty
        answer = 0
        for hour, customer in enumerate(customers, 1):
            penalty += 1 if customer == "N" else -1
            if penalty < best_penalty:
                best_penalty = penalty
                answer = hour
        return answer
