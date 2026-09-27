class Solution {
    public int hIndex(int[] citations) {
        Arrays.sort(citations);
        int length = citations.length;
        for (int index = 0; index < length; index++) {
            int papers = length - index;
            if (citations[index] >= papers) {
                return papers;
            }
        }
        return 0;
    }
}
