class Solution {
public List<String> findRepeatedDnaSequences(String s){Set<String> seen=new HashSet<>(),out=new HashSet<>();for(int i=0;i+10<=s.length();i++){String v=s.substring(i,i+10);if(!seen.add(v))out.add(v);}return new ArrayList<>(out);}
}
