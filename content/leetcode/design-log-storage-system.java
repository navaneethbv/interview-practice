class LogSystem {
    private final List<int[]> identifiers = new ArrayList<>();
    private final List<String> timestamps = new ArrayList<>();

    public void put(int id, String timestamp) {
        identifiers.add(new int[]{id});
        timestamps.add(timestamp);
    }

    public List<Integer> retrieve(String start, String end, String granularity) {
        int length = prefixLength(granularity);
        String startPrefix = start.substring(0, length);
        String endPrefix = end.substring(0, length);
        List<Integer> result = new ArrayList<>();
        for (int index = 0; index < timestamps.size(); index++) {
            String timestampPrefix = timestamps.get(index).substring(0, length);
            if (startPrefix.compareTo(timestampPrefix) <= 0
                    && timestampPrefix.compareTo(endPrefix) <= 0) {
                result.add(identifiers.get(index)[0]);
            }
        }
        return result;
    }

    private int prefixLength(String granularity) {
        if (granularity.equals("Year")) {
            return 4;
        }
        if (granularity.equals("Month")) {
            return 7;
        }
        if (granularity.equals("Day")) {
            return 10;
        }
        if (granularity.equals("Hour")) {
            return 13;
        }
        if (granularity.equals("Minute")) {
            return 16;
        }
        return 19;
    }
}
