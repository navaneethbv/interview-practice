class AuthenticationManager {
    private final int timeToLive;
    // Insertion order equals expiry order because every update moves a token to the end with the latest expiry.
    private final LinkedHashMap<String, Integer> expires = new LinkedHashMap<>();

    public AuthenticationManager(int timeToLive) {
        this.timeToLive = timeToLive;
    }

    public void generate(String tokenId, int currentTime) {
        expireUpTo(currentTime);
        expires.put(tokenId, currentTime + timeToLive);
    }

    public void renew(String tokenId, int currentTime) {
        expireUpTo(currentTime);
        if (expires.remove(tokenId) != null) {
            expires.put(tokenId, currentTime + timeToLive);
        }
    }

    public int countUnexpiredTokens(int currentTime) {
        expireUpTo(currentTime);
        return expires.size();
    }

    private void expireUpTo(int currentTime) {
        Iterator<Map.Entry<String, Integer>> it = expires.entrySet().iterator();
        while (it.hasNext() && it.next().getValue() <= currentTime) {
            it.remove();
        }
    }
}
