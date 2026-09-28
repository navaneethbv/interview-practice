class Solution {
    public long minimumCost(String source, String target, char[] original, char[] changed, int[] cost) {
        long infinity = Long.MAX_VALUE / 4;
        long[][] distance = new long[26][26];
        for (int start = 0; start < 26; start++) {
            Arrays.fill(distance[start], infinity);
            distance[start][start] = 0;
        }
        for (int index = 0; index < cost.length; index++) {
            int start = original[index] - 'a';
            int end = changed[index] - 'a';
            distance[start][end] = Math.min(distance[start][end], cost[index]);
        }
        for (int middle = 0; middle < 26; middle++) {
            for (int start = 0; start < 26; start++) {
                for (int end = 0; end < 26; end++) {
                    distance[start][end] = Math.min(
                            distance[start][end], distance[start][middle] + distance[middle][end]);
                }
            }
        }
        long answer = 0;
        for (int index = 0; index < source.length(); index++) {
            long price = distance[source.charAt(index) - 'a'][target.charAt(index) - 'a'];
            if (price == infinity) {
                return -1;
            }
            answer += price;
        }
        return answer;
    }
}
