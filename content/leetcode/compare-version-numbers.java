class Solution {
    public int compareVersion(String version1, String version2) {
        String[] first = version1.split("\\.");
        String[] second = version2.split("\\.");
        int length = Math.max(first.length, second.length);
        for (int index = 0; index < length; index++) {
            int firstPart = index < first.length ? Integer.parseInt(first[index]) : 0;
            int secondPart = index < second.length ? Integer.parseInt(second[index]) : 0;
            if (firstPart != secondPart) {
                return firstPart < secondPart ? -1 : 1;
            }
        }
        return 0;
    }
}
