class Solution {
public List<List<Integer>> findRLEArray(int[][] encoded1,int[][] encoded2){List<List<Integer>>out=new ArrayList<>();int i=0,j=0,a=encoded1[0][1],b=encoded2[0][1];while(i<encoded1.length){int count=Math.min(a,b),v=encoded1[i][0]*encoded2[j][0];if(!out.isEmpty()&&out.get(out.size()-1).get(0)==v){List<Integer>last=out.get(out.size()-1);last.set(1,last.get(1)+count);}else out.add(new ArrayList<>(Arrays.asList(v,count)));a-=count;b-=count;if(a==0&&++i<encoded1.length)a=encoded1[i][1];if(b==0&&++j<encoded2.length)b=encoded2[j][1];}return out;}
}
