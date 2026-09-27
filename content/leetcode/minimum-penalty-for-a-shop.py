class Solution:
    def bestClosingTime(self, customers):
        penalty=customers.count('Y'); best=penalty; answer=0
        for i,c in enumerate(customers,1):
            penalty+=1 if c=='N' else -1
            if penalty<best: best=penalty; answer=i
        return answer
