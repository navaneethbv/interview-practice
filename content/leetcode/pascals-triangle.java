class Solution {
public List<List<Integer>> generate(int numRows) {List<List<Integer>> out=new ArrayList<>();for(int r=0;r<numRows;r++) {List<Integer> row=new ArrayList<>();for(int c=0;c<=r;c++) row.add(c==0||c==r?1:out.get(r-1).get(c-1)+out.get(r-1).get(c));out.add(row);}return out;}
}
