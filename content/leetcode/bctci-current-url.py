class Solution:
    def currentUrl(self, actions):
        history = []
        for kind, value in actions:
            if kind == "go":
                history.append(value)
            else:
                for _ in range(min(int(value), len(history) - 1)):
                    history.pop()
        return history[-1]
