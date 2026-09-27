class Solution {
public int[] findOrder(int numCourses,int[][] prerequisites){List<List<Integer>>next=new ArrayList<>();for(int i=0;i<numCourses;i++)next.add(new ArrayList<>());int[]deg=new int[numCourses];for(int[]p:prerequisites){next.get(p[1]).add(p[0]);deg[p[0]]++;}Deque<Integer>q=new ArrayDeque<>();for(int i=0;i<numCourses;i++)if(deg[i]==0)q.add(i);int[]out=new int[numCourses];int k=0;while(!q.isEmpty()){int c=q.remove();out[k++]=c;for(int child:next.get(c))if(--deg[child]==0)q.add(child);}return k==numCourses?out:new int[0];}
}
