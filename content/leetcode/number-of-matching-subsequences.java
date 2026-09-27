class Solution {
public int numMatchingSubseq(String s,String[] words) {
    List<List<Integer>> pos=new ArrayList<>();for(int i=0;i<26;i++) pos.add(new ArrayList<>());for(int i=0;i<s.length();i++) pos.get(s.charAt(i)-'a').add(i);int count=0;
    for(String w:words) {int previous=-1;boolean ok=true;for(char c:w.toCharArray()) {List<Integer> indexes=pos.get(c-'a');int l=0,r=indexes.size();while(l<r) {int m=(l+r)/2;if(indexes.get(m)<=previous) l=m+1;else r=m;}if(l==indexes.size()) {ok=false;break;}previous=indexes.get(l);}if(ok) count++;}return count;
}
}
