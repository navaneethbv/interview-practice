class AuthenticationManager:
    def __init__(self, timeToLive):
        self.ttl = timeToLive
        self.expires = {}

    def generate(self, tokenId, currentTime):
        self.expires[tokenId] = currentTime + self.ttl

    def renew(self, tokenId, currentTime):
        if self.expires.get(tokenId, 0) > currentTime:
            self.expires[tokenId] = currentTime + self.ttl

    def countUnexpiredTokens(self, currentTime):
        return sum(1 for expiry in self.expires.values() if expiry > currentTime)
