class Logger:
    def __init__(self):
        self.last_printed_at = {}

    def shouldPrintMessage(self, timestamp, message):
        last_time = self.last_printed_at.get(message)
        if last_time is not None and timestamp - last_time < 10:
            return False

        self.last_printed_at[message] = timestamp
        return True
