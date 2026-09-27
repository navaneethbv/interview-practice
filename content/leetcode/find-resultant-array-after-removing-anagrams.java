class Solution {
public List<String> removeAnagrams(String[] words){List<String>out=new ArrayList<>();String previous=null;for(String w:words){char[]a=w.toCharArray();Arrays.sort(a);String signature=new String(a);if(!signature.equals(previous)){out.add(w);previous=signature;}}return out;}
}
