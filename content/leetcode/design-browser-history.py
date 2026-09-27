class BrowserHistory:
    def __init__(self, homepage):
        self.pages = [homepage]
        self.index = 0

    def visit(self, url):
        del self.pages[self.index + 1:]
        self.pages.append(url)
        self.index += 1

    def back(self, steps):
        self.index = max(0, self.index - steps)
        return self.pages[self.index]

    def forward(self, steps):
        self.index = min(len(self.pages) - 1, self.index + steps)
        return self.pages[self.index]
