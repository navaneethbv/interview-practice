class Solution:
    def currentUrlWithForward(self, actions):
        pages = []
        current = -1
        for kind, value in actions:
            if kind == "go":
                current += 1
                del pages[current:]
                pages.append(value)
            elif kind == "back":
                current = max(0, current - int(value))
            else:
                current = min(len(pages) - 1, current + int(value))
        return pages[current]
