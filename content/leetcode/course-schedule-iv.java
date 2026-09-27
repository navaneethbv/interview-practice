class Solution {
public List<Boolean> checkIfPrerequisite(int numCourses,int[][] prerequisites,int[][] queries) {boolean[][] reach=new boolean[numCourses][numCourses];for(int[] e:prerequisites) reach[e[0]][e[1]]=true;for(int k=0;k<numCourses;k++) for(int i=0;i<numCourses;i++) if(reach[i][k]) for(int j=0;j<numCourses;j++) reach[i][j]|=reach[k][j];List<Boolean> result=new ArrayList<>();for(int[] q:queries) result.add(reach[q[0]][q[1]]);return result;}
}
