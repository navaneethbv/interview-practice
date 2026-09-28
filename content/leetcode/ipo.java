class Solution {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int[][] projects = new int[profits.length][2];
        for (int index = 0; index < profits.length; index++) {
            projects[index] = new int[]{capital[index], profits[index]};
        }
        Arrays.sort(projects, (first, second) -> Integer.compare(first[0], second[0]));
        PriorityQueue<Integer> available = new PriorityQueue<>(Collections.reverseOrder());
        int projectIndex = 0;
        while (k > 0) {
            while (projectIndex < projects.length && projects[projectIndex][0] <= w) {
                available.add(projects[projectIndex][1]);
                projectIndex++;
            }
            if (available.isEmpty()) {
                break;
            }
            w += available.remove();
            k--;
        }
        return w;
    }
}
