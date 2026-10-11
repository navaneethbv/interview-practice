class TextEditor:
    def __init__(self):
        # Characters left of the cursor, and characters right of it in reverse order.
        self.left = []
        self.right = []

    def addText(self, text):
        self.left.extend(text)

    def deleteText(self, k):
        deleted = min(k, len(self.left))
        del self.left[len(self.left) - deleted:]
        return deleted

    def cursorLeft(self, k):
        for _ in range(min(k, len(self.left))):
            self.right.append(self.left.pop())
        return "".join(self.left[-10:])

    def cursorRight(self, k):
        for _ in range(min(k, len(self.right))):
            self.left.append(self.right.pop())
        return "".join(self.left[-10:])
