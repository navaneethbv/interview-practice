class Codec:
    def __init__(self):
        self.urls = {}

    def encode(self, longUrl):
        short_url = 'https://tiny.local/' + str(len(self.urls))
        self.urls[short_url] = longUrl
        return short_url

    def decode(self, shortUrl):
        return self.urls[shortUrl]
