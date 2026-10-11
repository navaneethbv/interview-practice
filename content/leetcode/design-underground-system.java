class UndergroundSystem {
    private final Map<Integer, String> startStation = new HashMap<>();
    private final Map<Integer, Integer> startTime = new HashMap<>();
    private final Map<String, long[]> routes = new HashMap<>();

    public UndergroundSystem() {
    }

    public void checkIn(int id, String stationName, int t) {
        startStation.put(id, stationName);
        startTime.put(id, t);
    }

    public void checkOut(int id, String stationName, int t) {
        String route = startStation.remove(id) + "->" + stationName;
        long[] totals = routes.computeIfAbsent(route, key -> new long[2]);
        totals[0] += t - startTime.remove(id);
        totals[1]++;
    }

    public double getAverageTime(String startStation, String endStation) {
        long[] totals = routes.get(startStation + "->" + endStation);
        return (double) totals[0] / totals[1];
    }
}
