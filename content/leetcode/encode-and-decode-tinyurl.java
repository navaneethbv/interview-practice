class Codec {
    private final Map<String, String> urls = new HashMap<>();

    public String encode(String longUrl) {
        String shortUrl = "https://tiny.local/" + urls.size();
        urls.put(shortUrl, longUrl);
        return shortUrl;
    }

    public String decode(String shortUrl) {
        return urls.get(shortUrl);
    }
}
