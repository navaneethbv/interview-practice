class Codec:
    def __init__(self): self.urls={}
    def encode(self, longUrl):
        short='https://tiny.local/'+str(len(self.urls))
        self.urls[short]=longUrl
        return short
    def decode(self, shortUrl): return self.urls[shortUrl]
