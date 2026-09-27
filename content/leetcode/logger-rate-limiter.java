class Logger {
    private final Map<String, Integer> lastPrintedAt = new HashMap<>();

    public Logger() {
    }

    public boolean shouldPrintMessage(int timestamp, String message) {
        Integer lastTime = lastPrintedAt.get(message);
        if (lastTime != null && timestamp - lastTime < 10) {
            return false;
        }
        lastPrintedAt.put(message, timestamp);
        return true;
    }
}
