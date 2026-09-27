class Solution:
    def removeInvalidParentheses(self, s):
        def valid(text):
            balance=0
            for c in text:
                if c=='(': balance+=1
                elif c==')':
                    balance-=1
                    if balance<0: return False
            return balance==0
        level={s}
        while True:
            result=[text for text in level if valid(text)]
            if result: return sorted(result)
            level={text[:i]+text[i+1:] for text in level for i,c in enumerate(text) if c in '()'}
