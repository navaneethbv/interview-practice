class Solution {
    private static final int FIRST_YEAR = 1000;
    private static final int LAST_YEAR = 2025;

    public List<List<String>> sortByYear(List<List<String>> books) {
        List<List<List<String>>> buckets = new ArrayList<>();
        for (int year = FIRST_YEAR; year <= LAST_YEAR; year++) {
            buckets.add(new ArrayList<>());
        }
        for (List<String> book : books) {
            buckets.get(Integer.parseInt(book.get(4)) - FIRST_YEAR).add(book);
        }
        List<List<String>> sorted = new ArrayList<>();
        for (List<List<String>> bucket : buckets) {
            sorted.addAll(bucket);
        }
        return sorted;
    }
}
