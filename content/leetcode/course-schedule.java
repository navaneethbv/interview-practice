class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> edges = new ArrayList<>();
        for (int i=0;i<numCourses;i++) edges.add(new ArrayList<>());
        int[] degree = new int[numCourses];
        for (int[] p:prerequisites) { edges.get(p[1]).add(p[0]); degree[p[0]]++; }
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for(int i=0;i<numCourses;i++) if(degree[i]==0) queue.add(i);
        int count=0;
        while(!queue.isEmpty()) { int c=queue.remove();count++; for(int n:edges.get(c)) if(--degree[n]==0) queue.add(n); }
        return count==numCourses;
    }
}
