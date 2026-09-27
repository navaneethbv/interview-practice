class Solution:
    def countAndSay(self, n):
        term = "1"

        for _ in range(n - 1):
            next_term = []
            index = 0
            while index < len(term):
                end = index + 1
                while end < len(term) and term[end] == term[index]:
                    end += 1
                next_term.append(str(end - index))
                next_term.append(term[index])
                index = end
            term = "".join(next_term)

        return term
