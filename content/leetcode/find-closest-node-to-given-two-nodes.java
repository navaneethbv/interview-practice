class Solution {
    public int closestMeetingNode(int[] edges, int node1, int node2) {
        int[] first = distances(edges, node1);
        int[] second = distances(edges, node2);
        int bestDistance = edges.length + 1;
        int answer = -1;
        for (int node = 0; node < edges.length; node++) {
            if (first[node] >= 0 && second[node] >= 0) {
                int distance = Math.max(first[node], second[node]);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    answer = node;
                }
            }
        }
        return answer;
    }

    private int[] distances(int[] edges, int start) {
        int[] distances = new int[edges.length];
        Arrays.fill(distances, -1);
        int node = start;
        int distance = 0;
        while (node != -1 && distances[node] == -1) {
            distances[node] = distance++;
            node = edges[node];
        }
        return distances;
    }
}
