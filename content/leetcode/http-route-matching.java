class Router {
    private final Map<String, String[]> routes = new LinkedHashMap<>();

    public Router() {}

    private String[] segments(String path) {
        return path.equals("/") ? new String[0] : path.substring(1).split("/");
    }

    public void register(String pattern) {
        routes.putIfAbsent(pattern, segments(pattern));
    }

    private int score(String[] pattern, String[] path) {
        if (pattern.length != path.length) {
            return -1;
        }
        int literals = 0;
        for (int i = 0; i < path.length; i++) {
            if (pattern[i].startsWith("{")) {
                continue;
            }
            if (!pattern[i].equals(path[i])) {
                return -1;
            }
            literals++;
        }
        return literals;
    }

    public String match(String path) {
        String[] parts = segments(path);
        String answer = "";
        int best = -1;
        for (Map.Entry<String, String[]> route : routes.entrySet()) {
            int current = score(route.getValue(), parts);
            if (current > best) {
                answer = route.getKey();
                best = current;
            }
        }
        return answer;
    }
}
