class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] lastPosition = new int[26];
        for (int index = 0; index < s.length(); index++) {
            lastPosition[s.charAt(index) - 'a'] = index;
        }

        List<Integer> lengths = new ArrayList<>();
        int partitionStart = 0;
        int partitionEnd = 0;
        for (int index = 0; index < s.length(); index++) {
            partitionEnd = Math.max(
                    partitionEnd,
                    lastPosition[s.charAt(index) - 'a']
            );
            if (index == partitionEnd) {
                lengths.add(index - partitionStart + 1);
                partitionStart = index + 1;
            }
        }
        return lengths;
    }
}
