class Logger:
    def __init__(self):self.last={}
    def shouldPrintMessage(self,timestamp,message):
        if message in self.last and timestamp-self.last[message]<10:return False
        self.last[message]=timestamp;return True
